


const handler = async (req, res) => {

    req.session.destroy((err) => {
        if (err) {
            return new Response('An error occurred', { status: 500 });
        } else {
            return new Response('Logged out', { status: 200 });
        }
    });

}

export { handler as POST , handler as GET}