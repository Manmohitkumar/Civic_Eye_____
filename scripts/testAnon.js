(async () => {
    try {
        const payload = {
            reference_id: 'TEST-REF-456',
            title: 'Test',
            reporter_name: 'Tester',
            reporter_email: 'test@example.com',
            category: 'Roads & Infrastructure',
            description: 'Test anon complaint',
            location: '12.34,56.78'
        };

        const res = await fetch('http://127.0.0.1:5000/api/complaints/anonymous', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
            // keep timeout short
        });

        const text = await res.text();
        console.log('STATUS', res.status);
        console.log('BODY', text);
    } catch (err) {
        console.error('ERROR', err);
    }
})();
