export async function GET() {
    try {
        const response = await fetch('https://travel-guide-tan.vercel.app/api/cities');
        const data = await response.json();
        if (response.ok) {
            return Response.json(data);
        }
        throw data;
    } catch (error) {
        return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}
