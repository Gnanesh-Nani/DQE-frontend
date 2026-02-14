import React from 'react';
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

interface SimpleChartProps {
    chartType: string;
    results: any[];
    schema: any[];
}

const SimpleChart: React.FC<SimpleChartProps> = ({
    chartType,
    results,
    schema
}) => {
    if (results.length === 0) {
        return <div className="empty-chart">No data to display</div>;
    }

    const getNumericColumn = () => {
        return schema.find((col: any) => col.type === 'number');
    };

    const getCategoricalColumn = () => {
        // Accept string, date, or other types (dates often come as 'other')
        return schema.find((col: any) => col.type === 'string' || col.type === 'other' || col.type === 'date');
    };

    const colors = [
        '#00D9FF', '#0099FF', '#FF6B9D', '#FFA500', '#26C485',
        '#9D4EDD', '#5A189A', '#FF006E', '#FB5607', '#FFBE0B'
    ];

    const renderChart = () => {
        switch (chartType) {
            case 'bar': {
                const catCol = getCategoricalColumn();
                const numCol = getNumericColumn();
                if (!catCol || !numCol) return <div className="chart-placeholder">Data format not suitable for bar chart</div>;

                const chartData = results.slice(0, 20).map((row: any) => ({
                    name: String(row[catCol.column]),
                    value: Number(row[numCol.column]) || 0
                }));

                return (
                    <div style={{ width: '100%', height: '400px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                            >
                                <defs>
                                    {colors.map((color, idx) => (
                                        <linearGradient key={idx} id={`gradient-${idx}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={color} stopOpacity={0.9} />
                                            <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    style={{ fontSize: '12px', fill: '#666' }}
                                />
                                <YAxis style={{ fontSize: '12px', fill: '#666' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                    }}
                                    cursor={{ fill: 'rgba(78, 205, 196, 0.1)' }}
                                    formatter={(value) => Number(value).toLocaleString()}
                                />
                                <Bar dataKey="value" fill="url(#gradient-0)" radius={[8, 8, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                );
            }

            case 'pie': {
                const numCol = getNumericColumn();
                if (!numCol) return <div className="chart-placeholder">No numeric data for pie chart</div>;

                const chartData = results.slice(0, 10).map((row: any) => ({
                    name: String(Object.values(row)[0]),
                    value: Number(row[numCol.column]) || 0
                }));

                return (
                    <div style={{ width: '100%', height: '450px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <defs>
                                    {colors.map((color, idx) => (
                                        <linearGradient key={idx} id={`pie-gradient-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor={color} stopOpacity={1} />
                                            <stop offset="100%" stopColor={color} stopOpacity={0.7} />
                                        </linearGradient>
                                    ))}
                                </defs>
                                <Pie
                                    data={chartData}
                                    cx="50%"
                                    cy="45%"
                                    labelLine={false}
                                    label={({ name, value }) => `${name}: ${Number(value).toLocaleString()}`}
                                    outerRadius={110}
                                    fill="#8884d8"
                                    dataKey="value"
                                    animationBegin={0}
                                    animationDuration={800}
                                    animationEasing="ease-out"
                                >
                                    {chartData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`url(#pie-gradient-${index % colors.length})`} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                    }}
                                    formatter={(value) => Number(value).toLocaleString()}
                                />
                                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ paddingTop: '20px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                );
            }

            case 'line': {
                const catCol = getCategoricalColumn();
                const numCol = getNumericColumn();
                if (!catCol || !numCol) return <div className="chart-placeholder">Data format not suitable for line chart</div>;

                const chartData = results.slice(0, 30).map((row: any) => ({
                    name: String(row[catCol.column]),
                    value: Number(row[numCol.column]) || 0
                }));

                return (
                    <div style={{ width: '100%', height: '400px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 0, bottom: 60 }}
                            >
                                <defs>
                                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#00D9FF" stopOpacity={0.3} />
                                        <stop offset="100%" stopColor="#00D9FF" stopOpacity={0.01} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    angle={-45}
                                    textAnchor="end"
                                    height={100}
                                    style={{ fontSize: '12px', fill: '#666' }}
                                />
                                <YAxis style={{ fontSize: '12px', fill: '#666' }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e5e5',
                                        borderRadius: '8px',
                                        padding: '12px',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                    }}
                                    cursor={{ stroke: '#00D9FF', strokeWidth: 2 }}
                                    formatter={(value) => Number(value).toLocaleString()}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke="#00D9FF"
                                    dot={{ fill: '#0099FF', r: 6, strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 8, strokeWidth: 3 }}
                                    strokeWidth={3}
                                    isAnimationActive={true}
                                    animationDuration={800}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                );
            }

            default:
                return (
                    <div className="chart-placeholder">
                        Chart type "{chartType}" - displaying as table
                    </div>
                );
        }
    };

    return renderChart();
};

export default SimpleChart;
