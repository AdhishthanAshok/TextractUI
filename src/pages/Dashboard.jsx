import { useState } from 'react';
import { FiUpload, FiFileText, FiDatabase, FiSettings, FiUser, FiPieChart, FiDownload } from 'react-icons/fi';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [recentFiles, setRecentFiles] = useState([
        { id: 1, name: 'invoice_2023.pdf', type: 'PDF', date: '2023-11-15', status: 'processed' },
        { id: 2, name: 'survey_responses.jpg', type: 'Image', date: '2023-11-14', status: 'processing' },
        { id: 3, name: 'handwritten_notes.png', type: 'Image', date: '2023-11-12', status: 'processed' },
        { id: 4, name: 'application_form.pdf', type: 'PDF', date: '2023-11-10', status: 'processed' },
    ]);

    const stats = [
        { name: 'Processed Documents', value: '1,248', change: '+12%', changeType: 'positive' },
        { name: 'Extraction Accuracy', value: '96.7%', change: '+1.2%', changeType: 'positive' },
        { name: 'Handwriting Recognition', value: '89.3%', change: '-0.5%', changeType: 'negative' },
        { name: 'Pending Processing', value: '12', change: '-3', changeType: 'neutral' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white shadow-md">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-blue-600">Dashboard</h1>
                    <p className="text-xs text-gray-500 mt-1">All of your summarized details</p>
                </div>

                <nav className="mt-6">
                    <NavItem
                        icon={<FiPieChart className="w-5 h-5" />}
                        text="Overview"
                        active={activeTab === 'overview'}
                        onClick={() => setActiveTab('overview')}
                    />
                    <NavItem
                        icon={<FiUpload className="w-5 h-5" />}
                        text="Upload Documents"
                        active={activeTab === 'upload'}
                        onClick={() => setActiveTab('upload')}
                    />
                    <NavItem
                        icon={<FiFileText className="w-5 h-5" />}
                        text="Processed Files"
                        active={activeTab === 'files'}
                        onClick={() => setActiveTab('files')}
                    />
                    <NavItem
                        icon={<FiDatabase className="w-5 h-5" />}
                        text="Exported Data"
                        active={activeTab === 'export'}
                        onClick={() => setActiveTab('export')}
                    />
                    <NavItem
                        icon={<FiSettings className="w-5 h-5" />}
                        text="Settings"
                        active={activeTab === 'settings'}
                        onClick={() => setActiveTab('settings')}
                    />
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {/* Dashboard Content */}
                <main className="p-6">
                    {activeTab === 'overview' && (
                        <div>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {stats.map((stat, index) => (
                                    <StatCard key={index} stat={stat} />
                                ))}
                            </div>

                            {/* Recent Files */}
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800">Recent Files</h3>
                                    <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {recentFiles.map((file) => (
                                                <tr key={file.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.type}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <StatusBadge status={file.status} />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                                        <button className="text-green-600 hover:text-green-800">
                                                            <FiDownload className="inline mr-1" /> Export
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <QuickActionCard
                                    title="Upload New Document"
                                    description="Process PDFs, images, or scanned forms"
                                    icon={<FiUpload className="w-8 h-8 text-blue-600" />}
                                    buttonText="Upload Now"
                                    buttonColor="bg-blue-600 hover:bg-blue-700"
                                />
                                <QuickActionCard
                                    title="Export Data"
                                    description="Export extracted data as JSON, CSV or to database"
                                    icon={<FiDatabase className="w-8 h-8 text-green-600" />}
                                    buttonText="Export Data"
                                    buttonColor="bg-green-600 hover:bg-green-700"
                                />
                                <QuickActionCard
                                    title="Settings"
                                    description="Configure OCR, ICR and processing options"
                                    icon={<FiSettings className="w-8 h-8 text-gray-600" />}
                                    buttonText="Go to Settings"
                                    buttonColor="bg-gray-600 hover:bg-gray-700"
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div className="bg-white rounded-lg shadow p-8 text-center">
                            <div className="max-w-md mx-auto">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-6">
                                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop files here</h3>
                                    <p className="mt-1 text-sm text-gray-500">or</p>
                                    <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                        Browse files
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Supported formats: PDF, JPG, PNG, TIFF. Max file size: 20MB.
                                </p>
                                <div className="mt-6">
                                    <h4 className="text-sm font-medium text-gray-900 mb-2">Processing Options</h4>
                                    <div className="flex justify-center space-x-4">
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox text-blue-600" defaultChecked />
                                            <span className="ml-2 text-sm text-gray-700">OCR (Printed Text)</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input type="checkbox" className="form-checkbox text-blue-600" />
                                            <span className="ml-2 text-sm text-gray-700">ICR (Handwriting)</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'files' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-gray-800">All Processed Files</h3>
                                <div className="flex space-x-4">
                                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                                        <option>All Types</option>
                                        <option>PDF</option>
                                        <option>Image</option>
                                    </select>
                                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                                        <option>All Status</option>
                                        <option>Processed</option>
                                        <option>Processing</option>
                                        <option>Failed</option>
                                    </select>
                                    <input
                                        type="text"
                                        placeholder="Search files..."
                                        className="border border-gray-300 rounded-md px-3 py-1 text-sm w-64"
                                    />
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pages</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {[...recentFiles,
                                        { id: 5, name: 'receipt_oct.jpg', type: 'Image', date: '2023-11-08', status: 'processed' },
                                        { id: 6, name: 'contract.pdf', type: 'PDF', date: '2023-11-05', status: 'failed' },
                                        { id: 7, name: 'customer_feedback.png', type: 'Image', date: '2023-11-03', status: 'processed' },
                                        ].map((file) => (
                                            <tr key={file.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{file.name}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.type}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.date}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Math.floor(Math.random() * 5) + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <StatusBadge status={file.status} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-800 mr-3">View</button>
                                                    <button className="text-green-600 hover:text-green-800 mr-3">
                                                        <FiDownload className="inline mr-1" /> Export
                                                    </button>
                                                    {file.status === 'failed' && (
                                                        <button className="text-red-600 hover:text-red-800">Retry</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div className="text-sm text-gray-500">Showing 1 to 7 of 7 entries</div>
                                <div className="flex space-x-2">
                                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700 disabled:opacity-50" disabled>Previous</button>
                                    <button className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white text-gray-700">Next</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'export' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Export Extracted Data</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <ExportOptionCard
                                    title="Export as JSON"
                                    description="Structured data in JSON format"
                                    icon={<FiFileText className="w-8 h-8 text-blue-600" />}
                                />
                                <ExportOptionCard
                                    title="Export as CSV"
                                    description="Comma-separated values for spreadsheets"
                                    icon={<FiFileText className="w-8 h-8 text-green-600" />}
                                />
                                <ExportOptionCard
                                    title="Database Export"
                                    description="Direct export to connected database"
                                    icon={<FiDatabase className="w-8 h-8 text-purple-600" />}
                                />
                            </div>
                            <div className="mt-8">
                                <h4 className="text-md font-medium text-gray-800 mb-4">Recent Exports</h4>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Export Name</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">invoice_data_20231115</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">JSON</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-11-15</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">245 KB</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-800">Download</button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">survey_results_20231114</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">CSV</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-11-14</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">178 KB</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-blue-600 hover:text-blue-800">Download</button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow p-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-6">Settings</h3>
                            <div className="space-y-8">
                                <SettingSection
                                    title="OCR Configuration"
                                    description="Configure Optical Character Recognition settings"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">OCR Engine</label>
                                            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48">
                                                <option>Tesseract OCR</option>
                                                <option>Google Cloud Vision</option>
                                                <option>Amazon Textract</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">Language</label>
                                            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48">
                                                <option>English</option>
                                                <option>Spanish</option>
                                                <option>French</option>
                                                <option>German</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="preprocessing" className="form-checkbox text-blue-600" defaultChecked />
                                            <label htmlFor="preprocessing" className="ml-2 text-sm text-gray-700">Enable image preprocessing</label>
                                        </div>
                                    </div>
                                </SettingSection>

                                <SettingSection
                                    title="ICR Configuration"
                                    description="Intelligent Character Recognition for handwriting"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center">
                                            <input type="checkbox" id="enable-icr" className="form-checkbox text-blue-600" />
                                            <label htmlFor="enable-icr" className="ml-2 text-sm text-gray-700">Enable Handwriting Recognition (ICR)</label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">ICR Model</label>
                                            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48" disabled>
                                                <option>PyTorch Default</option>
                                                <option>Custom Model</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="confidence-threshold" className="form-checkbox text-blue-600" />
                                            <label htmlFor="confidence-threshold" className="ml-2 text-sm text-gray-700">Show low confidence warnings</label>
                                        </div>
                                    </div>
                                </SettingSection>

                                <SettingSection
                                    title="Export Settings"
                                    description="Configure default export options"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <label className="text-sm font-medium text-gray-700">Default Export Format</label>
                                            <select className="border border-gray-300 rounded-md px-3 py-1 text-sm w-48">
                                                <option>JSON</option>
                                                <option>CSV</option>
                                                <option>Database</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center">
                                            <input type="checkbox" id="auto-export" className="form-checkbox text-blue-600" />
                                            <label htmlFor="auto-export" className="ml-2 text-sm text-gray-700">Auto-export after processing</label>
                                        </div>
                                    </div>
                                </SettingSection>

                                <div className="pt-4 border-t border-gray-200">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md">
                                        Save Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

// Component for sidebar navigation items
const NavItem = ({ icon, text, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center w-full px-6 py-3 text-left ${active ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
            <span className="mr-3">{icon}</span>
            <span className="font-medium">{text}</span>
        </button>
    );
};

// Component for stat cards
const StatCard = ({ stat }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stat.changeType === 'positive' ? 'bg-green-100 text-green-800' :
                    stat.changeType === 'negative' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                    {stat.change}
                </span>
            </div>
        </div>
    );
};

// Component for status badges
const StatusBadge = ({ status }) => {
    const statusMap = {
        processed: { color: 'green', text: 'Processed' },
        processing: { color: 'blue', text: 'Processing' },
        failed: { color: 'red', text: 'Failed' },
    };

    const statusInfo = statusMap[status] || { color: 'gray', text: status };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${statusInfo.color}-100 text-${statusInfo.color}-800`}>
            {statusInfo.text}
        </span>
    );
};

// Component for quick action cards
const QuickActionCard = ({ title, description, icon, buttonText, buttonColor }) => {
    return (
        <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0">
                        {icon}
                    </div>
                    <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                        <p className="mt-1 text-sm text-gray-500">{description}</p>
                    </div>
                </div>
            </div>
            <div className="px-6 py-3 bg-gray-50 text-right">
                <button className={`${buttonColor} text-white py-2 px-4 rounded-md text-sm font-medium`}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

// Component for export option cards
const ExportOptionCard = ({ title, description, icon }) => {
    return (
        <div className="bg-white rounded-lg shadow p-6 flex flex-col">
            <div className="flex-shrink-0">
                {icon}
            </div>
            <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="mt-6 flex-grow flex items-end">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium w-full">
                    Export as {title.split(' ').pop()}
                </button>
            </div>
        </div>
    );
};

// Component for settings sections
const SettingSection = ({ title, description, children }) => {
    return (
        <div className="border-b border-gray-200 pb-6">
            <div className="mb-4">
                <h4 className="text-md font-medium text-gray-900">{title}</h4>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            {children}
        </div>
    );
};

export default Dashboard;