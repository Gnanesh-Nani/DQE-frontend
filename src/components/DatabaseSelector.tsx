import React, { useState } from 'react';

interface DatabaseSelectorProps {
    databases: string[];
    currentDatabase: string;
    onDatabaseChange: (database: string) => void;
    loading: boolean;
}

const DatabaseSelector: React.FC<DatabaseSelectorProps> = ({
    databases,
    currentDatabase,
    onDatabaseChange,
    loading
}) => {
    const [embeddingLoading, setEmbeddingLoading] = useState(false);
    const [embeddingMessage, setEmbeddingMessage] = useState('');

    const handleRefreshEmbeddings = async () => {
        if (!currentDatabase) {
            setEmbeddingMessage('Please select a database first');
            return;
        }

        setEmbeddingLoading(true);
        setEmbeddingMessage('Refreshing embeddings...');

        try {
            const response = await fetch('http://localhost:8000/refresh-embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ database: currentDatabase })
            });

            const data = await response.json();

            if (!data.error) {
                setEmbeddingMessage(`✓ ${data.message}`);
                setTimeout(() => setEmbeddingMessage(''), 3000);
            } else {
                setEmbeddingMessage(`✗ ${data.message}`);
            }
        } catch (err) {
            setEmbeddingMessage('✗ Failed to refresh embeddings');
            console.error(err);
        } finally {
            setEmbeddingLoading(false);
        }
    };

    return (
        <div className="database-selector">
            <h2>Database</h2>
            <select
                value={currentDatabase}
                onChange={(e) => onDatabaseChange(e.target.value)}
                disabled={loading || embeddingLoading}
                className="database-select"
            >
                <option value="">Select a database...</option>
                {databases.map((db) => (
                    <option key={db} value={db}>
                        {db}
                    </option>
                ))}
            </select>
            {loading && <div className="loading-spinner"></div>}

            <button
                onClick={handleRefreshEmbeddings}
                disabled={!currentDatabase || embeddingLoading}
                className="refresh-embeddings-btn"
                title="Clear and re-embed all tables in vector database"
            >
                {embeddingLoading ? (
                    <>
                        <span className="spinner"></span>
                        Refreshing...
                    </>
                ) : (
                    <>
                        <span>🔄</span>
                        Refresh Embeddings
                    </>
                )}
            </button>

            {embeddingMessage && (
                <p className={`embedding-message ${embeddingMessage.startsWith('✓') ? 'success' : 'error'}`}>
                    {embeddingMessage}
                </p>
            )}
        </div>
    );
};

export default DatabaseSelector;
