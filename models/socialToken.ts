import mongoose from 'mongoose';

interface ISocialToken {
    artist_address: string; 
    social_token_address: string;
    price_history: IPriceHistory[];
}

interface IPriceHistory {
    timestamp: number;
    price: string;
}

interface eventModelInterface extends mongoose.Model<EventDocument>{
    build(attr: ISocialToken): EventDocument;
}

interface EventDocument extends mongoose.Document {
    artist_address: string;
    social_token_address: string;
    price_history: IPriceHistory[];
}

const socialTokenSchema = new mongoose.Schema({
    artist_address: {
        type: String,
        required: true,
    },
    social_token_address: {
        type: String,
        required: true,
    },
    price_history : {
        type: Array,
    }
});

socialTokenSchema.statics.build = (attrs: ISocialToken) => {
    return new SocialToken(attrs);
}

const SocialToken = mongoose.model<EventDocument, eventModelInterface>('SocialToken', socialTokenSchema);

SocialToken.build({
    artist_address: '0x0',
    social_token_address: '0x0',
    price_history: [{
        timestamp: 0,
        price: '0'
    }]
});

export { SocialToken };
