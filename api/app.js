import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/send-pair-to-db', async (req, res) => {
    const { UUID, ipAddress } = req.body;
    
    if (!UUID || !ipAddress) {
        return req.status(400).json({ error: 'Something got wrong.' });
    }

    const { data, error } = await supabase
        .from('use-pairs')
        .insert([{ UUID, ipAddress }]);
    
    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ success: true, data });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});