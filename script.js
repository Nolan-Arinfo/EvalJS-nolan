// Tableau pour stocker les livres
var books = [];

// Fonction pour ajouter un livre
function addBook() {
    // Récupération des valeurs des champs de saisie
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;

    // Validation des champs
    if (title === '' || author === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    // Création d'un nouvel objet livre
    var book = {
        title: title,
        author: author,
        read: false // État de lecture initialisé à faux
    };

    // Ajout du livre au tableau
    books.push(book);
    clearInputFields();
    displayBooks(); // Mise à jour de l'affichage
}

// Fonction pour vider les champs de saisie
function clearInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
}

// Fonction pour afficher les livres
function displayBooks() {
    var bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Réinitialisation de la liste

    // Boucle pour afficher chaque livre
    books.forEach(function(book, index) {
        var li = document.createElement('li');
        li.className = 'list-group-item';

        var bookTitle = document.createElement('span');
        bookTitle.textContent = book.title + ' - ' + book.author;
        bookTitle.style.cursor = 'default';

        // Ajout d'une classe si le livre est marqué comme lu
        if (book.read) {
            bookTitle.classList.add('text-decoration-line-through');
        }

        li.appendChild(bookTitle);
        li.appendChild(createButton('Marquer comme lu', 'btn-success', function() {
            markAsRead(index);
        }));
        li.appendChild(createButton('Marquer comme non lu', 'btn-warning', function() {
            markAsUnread(index);
        }));
        li.appendChild(createButton('Supprimer', 'btn-danger', function() {
            removeBook(index);
        }));

        bookList.appendChild(li);
    });
}

// Fonction pour créer un bouton
function createButton(text, className, onClick) {
    var button = document.createElement('button');
    button.textContent = text;
    button.className = 'btn btn-sm float-right ml-2 ' + className;
    button.onclick = onClick;
    return button;
}

// Fonction pour marquer un livre comme lu
function markAsRead(index) {
    books[index].read = true;
    displayBooks(); // Mise à jour de l'affichage
}

// Fonction pour marquer un livre comme non lu
function markAsUnread(index) {
    books[index].read = false;
    displayBooks(); // Mise à jour de l'affichage
}

// Fonction pour supprimer un livre
function removeBook(index) {
    books.splice(index, 1); // Suppression du livre du tableau
    displayBooks(); // Mise à jour de l'affichage
}

// Événement pour le bouton "Ajouter"
document.getElementById('addBook').onclick = addBook;

// Événement pour la recherche
document.getElementById('search').oninput = function() {
    var searchTerm = this.value.toLowerCase();
    var filteredBooks = books.filter(function(book) {
        return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
    });
    displayFilteredBooks(filteredBooks);
};

// Fonction pour afficher les livres filtrés
function displayFilteredBooks(filteredBooks) {
    var bookList = document.getElementById('bookList');
    bookList.innerHTML = ''; // Réinitialisation de la liste

    // Boucle pour afficher chaque livre filtré
    filteredBooks.forEach(function(book, index) {
        var li = document.createElement('li');
        li.className = 'list-group-item';

        var bookTitle = document.createElement('span');
        bookTitle.textContent = book.title + ' - ' + book.author;
        bookTitle.style.cursor = 'default';

        if (book.read) {
            bookTitle.classList.add('text-decoration-line-through');
        }

        li.appendChild(bookTitle);
        li.appendChild(createButton('Marquer comme lu', 'btn-success', function() {
            markAsRead(books.indexOf(book));
        }));
        li.appendChild(createButton('Marquer comme non lu', 'btn-warning', function() {
            markAsUnread(books.indexOf(book));
        }));
        li.appendChild(createButton('Supprimer', 'btn-danger', function() {
            removeBook(books.indexOf(book));
        }));

        bookList.appendChild(li);
    });
}
