import React, { useState } from 'react';

interface SchemaViewerProps {
    schemas: {
        database: string;
        table_count: number;
        tables: any[];
    };
}

const SchemaViewer: React.FC<SchemaViewerProps> = ({ schemas }) => {
    const [expandedTable, setExpandedTable] = useState<string | null>(null);

    return (
        <div className="schema-viewer">
            <h2>Tables ({schemas.table_count})</h2>
            <div className="tables-list">
                {schemas.tables.map((table) => (
                    <div
                        key={table.table_name}
                        className={`table-item ${expandedTable === table.table_name ? 'expanded' : ''}`}
                    >
                        <button
                            className="table-name"
                            onClick={() =>
                                setExpandedTable(
                                    expandedTable === table.table_name ? null : table.table_name
                                )
                            }
                        >
                            <span className="table-icon">📋</span>
                            {table.table_name}
                            <span className="column-count">{table.columns.length} cols</span>
                        </button>

                        {expandedTable === table.table_name && (
                            <div className="columns-list">
                                {table.columns.map((col: any) => (
                                    <div key={col.name} className="column-item">
                                        <span className="column-name">{col.name}</span>
                                        <span className={`column-type type-${col.type}`}>
                                            {col.type}
                                        </span>
                                        {col.key && <span className="column-key">{col.key}</span>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SchemaViewer;
