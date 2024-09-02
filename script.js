// Example blog posts (initial posts)
let posts = [
    {
        id: 1,
        title: "My First Blog Post",
        content: "This is the content of my first blog post. I'm excited to start blogging!"
    },
    {
        id: 2,
        title: "Another Day, Another Post",
        content: "Here's some more content for my blog. I'm getting the hang of this!"
    }
];

// Password for post creation (you can change this)
const ADMIN_PASSWORD = "secret123";

// Function to load posts on the homepage
function loadPosts() {
    const postsContainer = document.getElementById('posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="post.html?id=${post.id}">Read More</a>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to load a single post on the post page
function loadPost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    const post = posts.find(p => p.id == postId);

    if (post) {
        document.getElementById('post-title').innerText = post.title;
        document.getElementById('post-content').innerText = post.content;
    }
}

// Function to handle post creation
function createPost(event) {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const password = document.getElementById('password').value;

    // Check if the entered password matches the admin password
    if (password === ADMIN_PASSWORD) {
        const newPost = {
            id: posts.length + 1,
            title: title,
            content: content
        };
        posts.push(newPost);
        alert("Post created successfully!");
        window.location.href = 'index.html'; // Redirect to home page after creation
    } else {
        alert("Incorrect password. Please try again.");
    }
}

// Call the appropriate function based on the page
if (document.getElementById('posts')) {
    loadPosts();
} else if (document.getElementById('post-title')) {
    loadPost();
} else if (document.getElementById('postForm')) {
    document.getElementById('postForm').addEventListener('submit', createPost);
}

