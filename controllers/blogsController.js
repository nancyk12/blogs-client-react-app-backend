const Blog = require("../models/Blog")

async function getAllBlogs(req, res) {
    try {
        const allBlogs = await Blog.find({});
        res.json({success: true, blogs: allBlogs});
    } catch (error) {
    res.json({ success: false, message: error });
    }
}
//async await
async function createBlog(req, res){
    try {
        const newBlog = new Blog({
            title: req.body.title,
            author: req.body.author,
            text: req.body.text,
            category: req.body.category,
        });
        const response = await newBlog.save();
        res.json({ success: true, addedBlog: response});
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error});
    }
}
//read
async function getOneBlogById(req, res){
    try{
        //console.log(req.params);
        const { idToGet } =  req.params;
        console.log(idToGet);
        const foundBlog = await Blog.findOneAndDelete({ id: idToGet});
        res.json({success: true, blogs:foundBlog});

    }catch (error) {
        console.log(error);
        res.json({success: false, message: error});
    }
}
//update
async function updateOneBlogById(req, res) {
	try {
		const { idToUpdate } = req.params;

		const updatedBlog = await Blog.findOneAndUpdate(
			{ id: idToUpdate },
			req.body
		);
		// const updatedBlog = Blog.updateOne({id: req.params.id}, req.body);
		res.json({ success: true, blogUpdate: updatedBlog });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: error });
	}
}


//delete
async function deleteOneBlogById(req, res){
    try{
        const { idToDelete } = req.params;
        const deletedBlog = await Blog.findOneAndDelete(
            {id:idToDelete}, 
            req.body
            );
        res.json({success: true, deleteBlog: deletedBlog});
    }catch (error){
        console.log(error);
        res.json({ success:false, message: error});}

    }module.exports = {
    getAllBlogs,
    createBlog, 
    getOneBlogById,
    updateOneBlogById,
    deleteOneBlogById,
};