const ProtectedPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Protected Page</h1>
      <p>This is a protected page that can only be accessed with a valid API key.</p>
    </div>
  );
};

export default ProtectedPage;