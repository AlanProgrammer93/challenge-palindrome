import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const inputSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
},
    { timestamps: true });

export default mongoose.model('Input', inputSchema);