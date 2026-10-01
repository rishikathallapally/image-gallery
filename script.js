/*  IMAGE DATA  */

const images = [
    {
        src: "images/nature1.jpg",
        category: "Nature",
        title: "Sun Rise"
    },
    {
        src: "images/people1.jpg",
        category: "People",
        title: "Street Stories"
    },
    {
        src: "images/food1.jpg",
        category: "Food",
        title: "Dum Biryani"
    },
    {
        src: "images/animals1.jpg",
        category: "Animals",
        title: "Safe in Her Protection"
    },
    {
        src: "images/art1.jpg",
        category: "Art",
        title: "Head in the Clouds"
    },
    {
        src: "images/nature2.jpg",
        category: "Nature",
        title: "Touch of Kodaikanal"
    },
    {
        src: "images/people2.jpg",
        category: "People",
        title: "Best Place"
    },
    {
        src: "images/food2.jpg",
        category: "Food",
        title: "South Indian Thali"
    },
    {
        src: "images/animals2.jpg",
        category: "Animals",
        title: "See Who Bought Flowers!"
    },
    {
        src: "images/art2.jpg",
        category: "Art",
        title: "Gentle Touch"
    },
    {
        src: "images/nature3.jpg",
        category: "Nature",
        title: "Waterfalls"
    },
    {
        src: "images/people3.jpg",
        category: "People",
        title: "Happy Days"
    },
    {
        src: "images/food3.jpg",
        category: "Food",
        title: "Healthy Breakfast"
    },
    {
        src: "images/animals3.jpg",
        category: "Animals",
        title: "Meowwwww!"
    },
    {
        src: "images/art3.jpg",
        category: "Art",
        title: "A World Behind the Pages"
    },
    {
        src: "images/nature4.jpg",
        category: "Nature",
        title: "Sunset + Beach = Awesome"
    },
    {
        src: "images/people4.jpg",
        category: "People",
        title: "Smiles for Sale"
    },
    {
        src: "images/food4.jpg",
        category: "Food",
        title: "Yummy Pasta!!!"
    },
    {
        src: "images/animals4.jpg",
        category: "Animals",
        title: "Hello Cutieee"
    },
    {
        src: "images/art4.jpg",
        category: "Art",
        title: "Faceless Star"
    },
    {
        src: "images/nature5.jpg",
        category: "Nature",
        title: "Best Season Ever"
    },
    {
        src: "images/people5.jpg",
        category: "People",
        title: "Made for Each Other"
    },
    {
        src: "images/food5.jpg",
        category: "Food",
        title: "Sweet Distractions"
    },
    {
        src: "images/animals5.jpg",
        category: "Animals",
        title: "Proof That Tigers Are Cute"
    },
    {
        src: "images/art5.jpg",
        category: "Art",
        title: "Bored!"
    },
    {
        src: "images/nature6.jpg",
        category: "Nature",
        title: "Dream Place"
    },
    {
        src: "images/people6.jpg",
        category: "People",
        title: "Life on the Ground"
    },
    {
        src: "images/food6.jpg",
        category: "Food",
        title: "I Love Cookies!"
    },
    {
        src: "images/animals6.jpg",
        category: "Animals",
        title: "Say Cheezzz!"
    },
    {
        src: "images/art6.jpg",
        category: "Art",
        title: "Mini-Canvas"
    }
];

/*  SELECT ELEMENTS  */
const galleryItems = document.querySelectorAll(".gallery-item");
const filterButtons = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("searchInput");
const favoritesBtn = document.getElementById("favoritesBtn");
const favoriteButtons = document.querySelectorAll(".favorite-btn");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxCategory = document.getElementById("lightboxCategory");
const closeBtn = document.getElementById("closeBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const darkModeBtn = document.getElementById("darkModeBtn");

/*  STATE  */
let currentIndex = 0;
let currentCategory = "all";
let favorites = JSON.parse(localStorage.getItem("visualDiaryFavorites")) || [];

/*  FAVORITES  */
function saveFavorites() {
    localStorage.setItem(
        "visualDiaryFavorites",
        JSON.stringify(favorites)
    );
}
function updateFavoriteButtons() {
    favoriteButtons.forEach(function(button) {
        const item = button.closest(".gallery-item");
        const index = Number(item.dataset.index);
        if (favorites.includes(index)) {
            button.textContent = "♥";
            button.classList.add("active");
        } else {
            button.textContent = "♡";
            button.classList.remove("active");
        }
    });
}

/*  FILTER GALLERY  */
function filterGallery() {
    const searchText = searchInput.value.toLowerCase().trim();
    galleryItems.forEach(function(item) {
        const index =
            Number(item.dataset.index);
        const category =
            item.dataset.category.toLowerCase();
        const title =
            item.querySelector("h3").textContent.toLowerCase();
        const matchesCategory =
            currentCategory === "all" ||
            currentCategory === "favorites" ||
            category === currentCategory.toLowerCase();
        const matchesSearch =
            title.includes(searchText) ||
            category.includes(searchText);
        const isFavorite =
            favorites.includes(index);
        const matchesFavorites =
            currentCategory !== "favorites" ||
            isFavorite;
        if (
            matchesCategory &&
            matchesSearch &&
            matchesFavorites
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}

/*  CATEGORY BUTTONS  */
filterButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        currentCategory =
            button.dataset.category;
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        filterGallery();
    });
});

/*  SEARCH  */
searchInput.addEventListener("input", function() {
    filterGallery();
});

/*  FAVORITE BUTTONS  */
favoriteButtons.forEach(function(button) {
    button.addEventListener("click", function(event) {
        /* Prevent opening the lightbox */
        event.stopPropagation();
        const item =
            button.closest(".gallery-item");
        const index =
            Number(item.dataset.index);
        if (favorites.includes(index)) {
            favorites =
                favorites.filter(function(id) {
                    return id !== index;
                });
        } else {
            favorites.push(index);
        }
        saveFavorites();
        updateFavoriteButtons();
        filterGallery();
    });
});

/*  OPEN LIGHTBOX  */
galleryItems.forEach(function(item) {
    item.addEventListener("click", function(event) {
        /* Don't open lightbox if favorite button was clicked */
        if (
            event.target.classList.contains("favorite-btn")
        ) {
            return;
        }
        const index =
            Number(item.dataset.index);

        openLightbox(index);
    });

});

/*  OPEN LIGHTBOX FUNCTION  */
function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

/*  UPDATE LIGHTBOX  */
function updateLightbox() {
    const image =
        images[currentIndex];
    if (!image) {
        return;
    }
    lightboxImage.src =
        image.src;
    lightboxImage.alt =
        image.title;
    lightboxTitle.textContent =
        image.title;
    lightboxCategory.textContent =
        image.category;
}

/*  GET VISIBLE IMAGES  */
function getVisibleIndexes() {
    const visibleIndexes = [];
    galleryItems.forEach(function(item) {
        if (
            item.style.display !== "none"
        ) {
            visibleIndexes.push(
                Number(item.dataset.index)
            );
        }
    });
    return visibleIndexes;
}

/* NEXT IMAGE */
nextBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    const visibleIndexes =
        getVisibleIndexes();
    if (visibleIndexes.length === 0) {
        return;
    }
    let currentPosition =
        visibleIndexes.indexOf(currentIndex);
    if (currentPosition === -1) {
        currentPosition = 0;
    } else {
        currentPosition++;
        if (
            currentPosition >= visibleIndexes.length
        ) {
            currentPosition = 0;
        }
    }
    currentIndex =
        visibleIndexes[currentPosition];
    updateLightbox();
});

/*  PREVIOUS IMAGE  */
prevBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    const visibleIndexes =
        getVisibleIndexes();
    if (visibleIndexes.length === 0) {
        return;
    }
    let currentPosition =
        visibleIndexes.indexOf(currentIndex);
    if (currentPosition === -1) {
        currentPosition =
            visibleIndexes.length - 1;
    } else {
        currentPosition--;
        if (currentPosition < 0) {
            currentPosition =
                visibleIndexes.length - 1;
        }
    }
    currentIndex =
        visibleIndexes[currentPosition];
    updateLightbox();
});

/*  CLOSE LIGHTBOX  */
function closeLightbox() {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", function() {
    closeLightbox();
});

/*  CLOSE BY BACKGROUND  */
lightbox.addEventListener("click", function(event) {
    if (
        event.target === lightbox
    ) {
        closeLightbox();
    }
});

/*  KEYBOARD NAVIGATION  */
document.addEventListener("keydown", function(event) {
    if (
        !lightbox.classList.contains("show")
    ) {
        return;
    }
    if (
        event.key === "ArrowRight"
    ) {
        nextBtn.click();
    }
    if (
        event.key === "ArrowLeft"
    ) {
        prevBtn.click();
    }
    if (
        event.key === "Escape"
    ) {
        closeLightbox();
    }
});

/*  DARK MODE  */
function updateDarkModeButton() {
    if (
        document.body.classList.contains("dark-mode")
    ) {
        darkModeBtn.textContent = "☀️";
    } else {
        darkModeBtn.textContent = "🌙";
    }
}
if (
    localStorage.getItem("visualDiaryDarkMode") === "enabled"
) {
    document.body.classList.add("dark-mode");
}
updateDarkModeButton();
darkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    if (
        document.body.classList.contains("dark-mode")
    ) {
        localStorage.setItem(
            "visualDiaryDarkMode",
            "enabled"
        );
    } else {
        localStorage.removeItem(
            "visualDiaryDarkMode"
        );
    }
    updateDarkModeButton();
});

/*  INITIALIZE  */
updateFavoriteButtons();
filterGallery();