import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mimeType: {
        type: String, // Store the MIME type as a string
        required: true // Update or remove this line as per requirement
    },
    downloadContent: {
        type: Number,
        required: true,
        default: 0
    }
});

const File = mongoose.model('file', fileSchema);

export default File;
