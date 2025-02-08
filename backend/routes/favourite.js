const router = require("express").Router();
const User = require("../models/user");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");


//add book to favorite
router.put("/add-book-to-favourite", authenticateToken , async (req, res) => {
    try{
         const { bookid, id } = req.headers;

         // Validate User
         const userData = await User.findById(id);

         // Check if book is already a favourite
         const isBookFavourite = userData.favourites.includes(bookid);
         if (isBookFavourite) {
            return res.status(200).json({ message: "Book is alreadly in favorites"});
         }

          // Add to favourites
         await User.findByIdAndUpdate(id, {$push: {favourites: bookid }});
         return res.status(200).json({ message: "Book added to favorites"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//Remove book from favourite
router.put("/remove-book-to-favourite", authenticateToken , async (req, res) => {
    try{
         const { bookid, id } = req.headers;

         // Validate User
         const userData = await User.findById(id);

         // Check if book is a favourite
         const isBookFavourite = userData.favourites.includes(bookid);
         if(isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid }});
         } 
        
           return res.status(200).json({ message: "Book removed from favourites"})
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

//get Favourite books of a particulare user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const {id} = req.headers;

        // Validate User
        const userData = await User.findById(id).populate("favourites");

        // Return favourite books
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred"});
    }
}); 


module.exports = router;
