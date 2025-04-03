import express from 'express';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

app.post('/send-pair', async (req, res) => {
    const { UUID, ipAddress } = req.body;

    if (!UUID || !ipAddress) {
        return res.status(400).json({ error: 'Missing UUID or IP address.' });
    }

    const { data, error } = await supabase
        .from('data-pairs')
        .insert([{ UUID, ipAddress }]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ success: true, data });
});

app.post('/check-pair', async (req, res) => {
    const { UUID, ipAddress } = req.body;

    if (!UUID || !ipAddress) {
        return res.status(400).json({ error: 'Missing UUID or IP address.' });
    }

    const { data, error } = await supabase
        .from('data-pairs')
        .select('*')
        .eq('UUID', UUID)
        .eq('ipAddress', ipAddress);

    if (error) return res.status(500).json({ error: error.message });

    if (data.length > 0) {
        return res.status(200).json({ valid: true });
    } else {
        return res.status(404).json({ valid: false });
    }
});

app.post('/send-uuid', async (req, res) => {
    const { UUID } = req.body;

    if (!UUID) return res.status(400).json({ error: 'Missing UUID.' });

    const { data, error } = await supabase
        .from('uuids')
        .insert([{ UUID }]);

    if (error) return res.status(500).json({ error: error.message });

    res.status(201).json({ success: true, data });
});

app.post('/check-uuid', async (req, res) => {
    const { UUID } = req.body;

    if (!UUID) return res.status(400).json({ error: 'Missing UUID.' });

    const { data, error } = await supabase
        .from('uuids')
        .select('*')
        .eq('UUID', UUID);

    if (error) return res.status(500).json({ error: error.message });

    if (data.length > 0) {
        return res.status(200).json({ valid: true });
    } else {
        return res.status(404).json({ valid: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
