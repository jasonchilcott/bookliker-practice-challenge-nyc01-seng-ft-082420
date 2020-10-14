document.addEventListener("DOMContentLoaded", function() {

    const baseUrl = "http://localhost:3000/books"

    const renderBooksList = (books) => {
        //take all books from fetch display name in books list
        const list = document.querySelector('#list')

        
        for (const book of books){
            let bookLi = document.createElement('li')

            bookLi.dataset.id = book.id
            bookLi.className = 'book-li'
            bookLi.innerText = `${book.title}`

            list.append(bookLi)
            

        }


    }

    const renderBook = (book) => {
        //iterate through each element of a book in show panel
        const showPanel = document.querySelector('#show-panel')
        showPanel.innerHTML = ""
        const bookShow = document.createElement('div')
        showPanel.appendChild(bookShow)
        bookShow.innerHTML = `
        <img src=${book.img_url} id="book-image">
        <h2 id="book-title">${book.title}</h2>
        <h3 id="book-author">${book.author}</h3>
        <p id="description">${book.description}</p>
        <div id="user-list" data-book-id="${book.id}">
        </div>
        `
        renderUsersList(book.users)

    }

    const renderUsersList = (users) => {
        //render list of all users who like the book
        const userDiv = document.querySelector('#user-list')
        const userUl = document.createElement('ul')
        userDiv.append(userUl)

        for (const user of users){
            let userLi = document.createElement('li')
            userLi.dataset.UserId = user.id
            userLi.innerText = `${user.username}`
            console.log(userLi)
            userUl.append(userLi)
            

        }
    }


    const getBooks = () => {
        //fetch all books

    fetch(baseUrl)
    .then(response => response.json())
    .then(books => renderBooksList(books))
    }

    const getSingleBook = (bookId) => {
        

        fetch(baseUrl + `/${bookId}`)
        .then(response => response.json())
        .then(book => renderBook(book))
    }

    const clickHandler = () => {
        document.addEventListener('click', (e) => {
            if (e.target.matches('.book-li')){
                let bookId = e.target.dataset.id
                getSingleBook(bookId)
            }


        })
    }



    getBooks()
    clickHandler()
    


});
