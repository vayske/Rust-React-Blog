use axum::{
    extract::Path,
    routing::get,
    Router,
    Json,
};
use std::fs;
use serde::{Serialize, Deserialize};
use tower_http::cors::CorsLayer;
use tower_http::services::{ServeDir, ServeFile};

// 定义你的文章元数据
#[derive(Serialize, Deserialize, Default, Clone)]
struct FrontMatter {
    #[serde(default)]
    title: String,
    #[serde(default)]
    date: String,
    tags: Option<Vec<String>>,
}

#[derive(Serialize)]
struct PostSummary {
    slug: String,
    metadata: FrontMatter,
}

#[derive(Serialize)]
struct PostResponse {
    slug: String,
    metadata: FrontMatter,
    content: String
}

#[tokio::main]
async fn main() {
    // 允许前端 (比如 localhost:5173) 访问
    let cors = CorsLayer::permissive();

    let app = Router::new()
        .route("/api/posts", get(list_posts))
        .route("/api/posts/:slug", get(get_post_content))
        .nest_service("/posts", ServeDir::new("./posts"))
        .fallback_service(
            ServeDir::new("./dist")
                .fallback(ServeFile::new("./dist/index.html"))
        )
        .layer(cors);

    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    println!("Listening on http://0.0.0.0:3000");
    axum::serve(listener, app).await.unwrap();
}

// 读取 posts 目录下的 markdown 文件
async fn get_post_content(Path(slug): Path<String>) -> Json<PostResponse> {
    let file_path = format!("./posts/{}/{}.md", slug, slug);
    let raw_text = fs::read_to_string(file_path).unwrap_or_else(|_| "# 404 Not Found".to_string());
    let mut metadata = FrontMatter::default();
    let mut content = raw_text.clone();
    // 核心修改：改为识别和切割 +++
    if raw_text.starts_with("+++\n") || raw_text.starts_with("+++\r\n") {
        let parts: Vec<&str> = raw_text.splitn(3, "+++").collect();
        if parts.len() == 3 {
            // 使用 toml::from_str 解析
            if let Ok(parsed_meta) = toml::from_str::<FrontMatter>(parts[1]) {
                metadata = parsed_meta;
            } else {
                println!("Warning: TOML 解析失败 for {}", slug); // 方便你在终端 debug
            }
            // 取出剩下的正文
            content = parts[2].trim_start().to_string();
        }
    }

    if metadata.title.is_empty() {
        metadata.title = slug.clone();
    }

    Json(PostResponse {
        slug,
        metadata,
        content,
    })
}

// 3. 核心逻辑：遍历 content 目录
async fn list_posts() -> Json<Vec<PostSummary>> {
    let mut posts = Vec::new();

    // 读取 content 目录下的所有条目
    if let Ok(entries) = fs::read_dir("./posts") {
        for entry in entries.flatten() {
            // 只处理文件夹（比如 content/a-trip-to-kyoto）
            if let Ok(file_type) = entry.file_type() {
                if file_type.is_dir() {
                    let slug = entry.file_name().to_string_lossy().to_string();
                    let file_path = format!("./posts/{}/{}.md", slug, slug);

                    // 如果文件夹里有 index.md，就解析它的头部
                    if let Ok(raw_text) = fs::read_to_string(&file_path) {
                        let mut metadata = FrontMatter::default();
                        if raw_text.starts_with("+++\n") || raw_text.starts_with("+++\r\n") {
                            let parts: Vec<&str> = raw_text.splitn(3, "+++").collect();
                            if parts.len() == 3 {
                                if let Ok(parsed_meta) = toml::from_str::<FrontMatter>(parts[1]) {
                                    metadata = parsed_meta;
                                }
                            }
                        }
                        if metadata.title.is_empty() {
                            metadata.title = slug.clone();
                        }
                        posts.push(PostSummary { slug, metadata });
                    }
                }
            }
        }
    }

    // 按日期倒序排列，最新的游记排在最前面
    posts.sort_by(|a, b| b.metadata.date.cmp(&a.metadata.date));

    Json(posts)
}
