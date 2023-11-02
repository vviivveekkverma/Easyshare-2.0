import { request, response } from "express";
import File from "../models/file.js";


export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname
    }
    try {
        const file = await File.create(fileObj);
        const baseUrl = process.env.PORT || 'https://easyshare-2-0.onrender.com' || 'http://localhost:8000';
        response.status(200).json({ path: `${baseUrl}/file/${file._id}` })
    } catch (error) {
       console.error(error.message);
       response.status(500).json({ error: error.message })
    }
}

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        file.downloadContent++;

        await file.save();

        // Set Content-Disposition header to force download
        response.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
        response.download(file.path, file.name);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ error: error.message });  
    }
}
