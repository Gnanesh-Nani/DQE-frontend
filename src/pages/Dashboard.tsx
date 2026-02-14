import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import DatabaseSelector from '../components/DatabaseSelector';
import SchemaViewer from '../components/SchemaViewer';
import QueryInput from '../components/QueryInput';
import ResultsDisplay from '../components/ResultsDisplay';

interface Database {
    databases: string[];
    current_database: string;
}

interface SchemaData {
    database: string;
    table_count: number;
    tables: any[];
}

interface QueryResult {
    error: boolean;
    message: string;
    data?: {
        query: string;
        generated_sql: string;
        results: any[];
        result_schema: any[];
        chart_type: string;
        result_count: number;
        token_analysis: any;
    };
}

const Dashboard: React.FC = () => {
    const [databases, setDatabases] = useState<string[]>([]);
    const [currentDatabase, setCurrentDatabase] = useState<string>('');
    const [schemas, setSchemas] = useState<SchemaData | null>(null);
    const [loading, setLoading] = useState(false);
    const [queryResult, setQueryResult] = useState<QueryResult | null>(null);
    const [isQuerying, setIsQuerying] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const API_BASE = 'http://localhost:8000';

    // Load databases on mount
    useEffect(() => {
        fetchDatabases();
    }, []);

    // Load schemas when database changes
    useEffect(() => {
        if (currentDatabase) {
            fetchSchemas();
        }
    }, [currentDatabase]);

    const fetchDatabases = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/databases`);
            const data = await response.json();

            if (!data.error && data.data) {
                setDatabases(data.data.databases);
                setCurrentDatabase(data.data.current_database);
            }
        } catch (err) {
            setError('Failed to fetch databases');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDatabaseChange = async (database: string) => {
        try {
            const response = await fetch(`${API_BASE}/set-database`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ database })
            });
            const data = await response.json();

            if (!data.error) {
                setCurrentDatabase(database);
                setQueryResult(null);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to switch database');
            console.error(err);
        }
    };

    const fetchSchemas = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/all-schemas`);
            const data = await response.json();

            if (!data.error && data.data) {
                setSchemas(data.data);
            }
        } catch (err) {
            setError('Failed to fetch schemas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleQuerySubmit = async (query: string) => {
        try {
            setIsQuerying(true);
            setError(null);
            setQueryResult(null);

            const response = await fetch(`${API_BASE}/generate-sql`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await response.json();

            setQueryResult(data);

            if (data.error) {
                setError(data.message);
            }
        } catch (err) {
            setError('Failed to execute query');
            console.error(err);
        } finally {
            setIsQuerying(false);
        }
    };

    return (
        <div className="dashboard">
            <header className="header">
                <h1>LLM Data Query Engine</h1>
                <p>Ask questions in natural language, get instant insights</p>
            </header>

            <div className="container">
                <aside className="sidebar">
                    <DatabaseSelector
                        databases={databases}
                        currentDatabase={currentDatabase}
                        onDatabaseChange={handleDatabaseChange}
                        loading={loading}
                    />

                    {schemas && (
                        <SchemaViewer schemas={schemas} />
                    )}
                </aside>

                <main className="main-content">
                    {error && (
                        <div className="error-banner">
                            <span>{error}</span>
                            <button onClick={() => setError(null)}>×</button>
                        </div>
                    )}

                    <QueryInput
                        onSubmit={handleQuerySubmit}
                        loading={isQuerying}
                        currentDatabase={currentDatabase}
                    />

                    {queryResult && (
                        <ResultsDisplay result={queryResult} />
                    )}

                    {!queryResult && !isQuerying && (
                        <div className="empty-state">
                            <div className="empty-icon">💡</div>
                            <p>Enter a natural language query to get started</p>
                            <small>Example: "Show me the top 10 users by registration date"</small>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
