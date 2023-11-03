import { request, response } from "express";
import File from "../models/file.js";


export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
        mimeType: request.file.mimetype // Capture the MIME type
    }
    try {
        const file = await File.create(fileObj);
        const baseUrl = process.env.PORT || 'https://easyshare-2-0.onrender.com' || 'http://localhost:8000';
        response.status(200).json({ path: `${baseUrl}/file/${file._id}` });
    } catch (error) {
       console.error(error.message);
       response.status(500).json({ error: error.message });
    }
};

export const downloadImage = async (request, response) => {
    try {
        const file = await File.findById(request.params.fileId);

        file.downloadContent++;

        await file.save();

        // Set Content-Disposition header to force download with the file name
        response.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);

        // Set Content-Type header with the stored MIME type
        response.setHeader('Content-Type', file.mimeType);

        response.sendFile(file.path);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ error: error.message });  
    }
}

