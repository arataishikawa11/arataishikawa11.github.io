document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");
    const links = document.querySelectorAll("nav ul li a");

    const pages = {
        home: "<h1>Home</h1><p>Welcome to the homepage.</p>",
        about: "<h1>About</h1><p>Learn more about us.</p>",
        services: "<h1>Services</h1><p>Check out our offerings.</p>",
        contact: "<h1>Contact</h1><p>Get in touch with us.</p>"
    };

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const page = this.getAttribute("href").substring(1);
            content.innerHTML = pages[page] || "<h1>Page not found</h1>";
        });
    });
});