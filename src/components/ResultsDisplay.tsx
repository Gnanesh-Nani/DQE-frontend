import React from 'react';
import SimpleChart from './SimpleChart';

interface ResultsDisplayProps {
    result: {
        error: boolean;
        message: string;
        data?: {
            query: string;
            generated_sql: string;
            results: any[];
            result_schema: any[];
            chart_type: string;
            result_count: number;
            token_analysis: {
                json_tokens: number;
                toon_tokens: number;
                tokens_saved: number;
                savings_percent: number;
            };
        };
    };
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
    const data = result.data;

    if (result.error || !data) {
        return (
            <div className="results-container error">
                <h2>Query Error</h2>
                <p>{result.message}</p>
            </div>
        );
    }

    return (
        <div className="results-container">
            <div className="results-header">
                <h2>Results</h2>
                <p>{result.message}</p>
            </div>

            {/* Chart Visualization */}
            {data.result_count > 0 && (
                <div className="results-section">
                    <div className="section-header">
                        <h3>📊 Visualization</h3>
                        <span className="chart-type-badge">{data.chart_type}</span>
                    </div>
                    <SimpleChart
                        chartType={data.chart_type}
                        results={data.results}
                        schema={data.result_schema}
                    />
                </div>
            )}

            {/* Generated SQL */}
            <div className="results-section">
                <div className="section-header">
                    <h3>🔍 Generated SQL</h3>
                </div>
                <div className="sql-box">
                    <code>{data.generated_sql}</code>
                    <button
                        className="copy-button"
                        onClick={() => navigator.clipboard.writeText(data.generated_sql)}
                    >
                        Copy
                    </button>
                </div>
            </div>

            {/* Token Analysis */}
            <div className="results-section">
                <div className="section-header">
                    <h3>⚡ Token Efficiency</h3>
                </div>
                <div className="token-analysis">
                    <div className="token-stat">
                        <span className="label">JSON Format</span>
                        <span className="value">{data.token_analysis.json_tokens} tokens</span>
                    </div>
                    <div className="token-stat">
                        <span className="label">TOON Format</span>
                        <span className="value">{data.token_analysis.toon_tokens} tokens</span>
                    </div>
                    <div className="token-stat highlight">
                        <span className="label">Tokens Saved</span>
                        <span className="value">
                            {data.token_analysis.tokens_saved} ({data.token_analysis.savings_percent}%)
                        </span>
                    </div>
                </div>
            </div>

            {/* Data Table */}
            {data.result_count > 0 && (
                <div className="results-section">
                    <div className="section-header">
                        <h3>📋 Data ({data.result_count} rows)</h3>
                    </div>
                    <div className="results-table-wrapper">
                        <table className="results-table">
                            <thead>
                                <tr>
                                    {data.result_schema.map((col: any) => (
                                        <th key={col.column}>{col.column}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.results.slice(0, 100).map((row: any, idx: number) => (
                                    <tr key={idx}>
                                        {data.result_schema.map((col: any) => (
                                            <td key={col.column}>{String(row[col.column] ?? '-')}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {data.result_count > 100 && (
                        <p className="results-note">Showing first 100 of {data.result_count} rows</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResultsDisplay;
