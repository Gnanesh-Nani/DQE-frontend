import React, { useState } from 'react';

interface QueryInputProps {
    onSubmit: (query: string) => void;
    loading: boolean;
    currentDatabase: string;
}

const QueryInput: React.FC<QueryInputProps> = ({
    onSubmit,
    loading,
    currentDatabase
}) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && currentDatabase) {
            onSubmit(query);
        }
    };

    return (
        <form className="query-input-form" onSubmit={handleSubmit}>
            <div className="query-header">
                <h2>Natural Language Query</h2>
                <p>Ask your question about the database</p>
            </div>

            <div className="query-input-group">
                <textarea
                    className="query-textarea"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Example: Show me the number of users by country in the last month"
                    disabled={loading || !currentDatabase}
                    rows={4}
                />
                <button
                    type="submit"
                    className="submit-button"
                    disabled={loading || !query.trim() || !currentDatabase}
                >
                    {loading ? (
                        <>
                            <span className="spinner"></span>
                            Analyzing...
                        </>
                    ) : (
                        <>
                            <span>⚡</span>
                            Generate & Execute
                        </>
                    )}
                </button>
            </div>

            {!currentDatabase && (
                <p className="info-text">Please select a database first</p>
            )}
        </form>
    );
};

export default QueryInput;
