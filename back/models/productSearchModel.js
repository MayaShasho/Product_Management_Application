import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    mysqlId: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});
productSchema.index({ name: 'text', description: 'text' });

const ProductMongo = mongoose.model('Product', productSchema);

export default ProductMongo;
