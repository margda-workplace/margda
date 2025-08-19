"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pencil, Trash2, Plus, X, Mail, Paperclip, Save, Eye, Copy } from "lucide-react";

const EmailTemplate = ({ sidebarCollapsed,
  onAddListClick,
  onAddDataClick,
  onRemoveDataClick,
  onVerifyEmailsClick,
  onManageListsClick,}) => {
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  
  const [templateData, setTemplateData] = useState({
    templateName: "",
    subject: "",
    content: "",
    attachments: [],
    isEditing: false,
    editingId: null
  });

  const [templates, setTemplates] = useState([
    {
      id: 1,
      sno: 1,
      type: "Email",
      subject: "Shiva",
      templateName: "Welcome Email",
      content: "Hello {user}, Welcome to our platform!",
      attachments: [],
      createdAt: "2024-01-15"
    }
  ]);

  const variables = [
    { key: "{euser}", label: "You" },
    { key: "{user}", label: "Subscriber" },
    { key: "{mobile}", label: "Mobile" },
    { key: "{whatsapp}", label: "WhatsApp" },
    { key: "{email}", label: "Your Email" },
    { key: "{date}", label: "Date" }
  ];

  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTemplates = templates.slice(startIndex, startIndex + itemsPerPage);

  const handleAddAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from(e.target.files);
      const newAttachments = files.map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        size: file.size,
        file: file
      }));
      setTemplateData(prev => ({
        ...prev,
        attachments: [...prev.attachments, ...newAttachments]
      }));
    };
    input.click();
  };

  const handleRemoveAttachment = (attachmentId) => {
    setTemplateData(prev => ({
      ...prev,
      attachments: prev.attachments.filter(att => att.id !== attachmentId)
    }));
  };

  const handleInsertVariable = (variable) => {
    const textarea = document.getElementById('templateContent');
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const content = templateData.content;
      const newContent = content.substring(0, start) + variable + content.substring(end);
      setTemplateData(prev => ({ ...prev, content: newContent }));
      
      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + variable.length, start + variable.length);
      }, 0);
    }
  };

  const handleSaveTemplate = () => {
    if (!templateData.templateName.trim() || !templateData.subject.trim()) {
      showToast("Please fill in template name and subject", "error");
      return;
    }

    if (templateData.isEditing) {
      // Update existing template
      setTemplates(prev => prev.map(template => 
        template.id === templateData.editingId 
          ? {
              ...template,
              templateName: templateData.templateName,
              subject: templateData.subject,
              content: templateData.content,
              attachments: templateData.attachments
            }
          : template
      ));
      showToast("Template updated successfully", "success");
    } else {
      // Create new template
      const newTemplate = {
        id: Date.now(),
        sno: templates.length + 1,
        type: "Email",
        subject: templateData.subject,
        templateName: templateData.templateName,
        content: templateData.content,
        attachments: templateData.attachments,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setTemplates(prev => [...prev, newTemplate]);
      showToast("Template created successfully", "success");
    }

    // Reset form
    setTemplateData({
      templateName: "",
      subject: "",
      content: "",
      attachments: [],
      isEditing: false,
      editingId: null
    });
    setShowEditor(false);
  };

  const handleEditTemplate = (template) => {
    setTemplateData({
      templateName: template.templateName,
      subject: template.subject,
      content: template.content,
      attachments: template.attachments || [],
      isEditing: true,
      editingId: template.id
    });
    setShowEditor(true);
  };

  const handleDeleteTemplate = (indexToDelete) => {
    const globalIndex = startIndex + indexToDelete;
    setTemplates(prev => prev.filter((_, idx) => idx !== globalIndex));
    showToast("Template deleted successfully", "success");
  };

  const handlePreviewTemplate = (template) => {
    setTemplateData({
      ...template,
      isEditing: false,
      editingId: null
    });
    setShowPreview(true);
  };

  const handleDuplicateTemplate = (template) => {
    const duplicatedTemplate = {
      ...template,
      id: Date.now(),
      sno: templates.length + 1,
      templateName: `${template.templateName} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTemplates(prev => [...prev, duplicatedTemplate]);
    showToast("Template duplicated successfully", "success");
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(templates.length / itemsPerPage))
      setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => setMounted(true), []);

  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3000);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderPreviewContent = () => {
    let content = templateData.content;
    variables.forEach(variable => {
      const sampleData = {
        '{euser}': 'John Doe',
        '{user}': 'Jane Smith',
        '{mobile}': '+1-555-0123',
        '{whatsapp}': '+1-555-0123',
        '{email}': 'john@example.com',
        '{date}': new Date().toLocaleDateString()
      };
      content = content.replace(new RegExp(variable.key.replace(/[{}]/g, '\\$&'), 'g'), sampleData[variable.key] || variable.key);
    });
    return content;
  };

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        animate={mounted ? "visible" : "hidden"}
        variants={variants}
        className="w-full px-4 sm:px-6 py-10 bg-gray-100"
      >
        <div className="max-w-full mx-auto space-y-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {"1.2.1. >> CRM >> Template >> Email"}
          </h1>

          {/* Control Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                setTemplateData({
                  templateName: "",
                  subject: "",
                  content: "",
                  attachments: [],
                  isEditing: false,
                  editingId: null
                });
                setShowEditor(true);
              }}
              className="bg-green-200 hover:bg-green-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
            >
              <Plus size={16} className="inline mr-2" />
              Create Template
            </button>
            <button
              onClick={() => setShowEditor(false)}
              className="bg-yellow-200 hover:bg-yellow-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
            >
              <Mail size={16} className="inline mr-2" />
              View Templates
            </button>
          </div>

          {/* Template Editor */}
          <AnimatePresence mode="wait">
            {showEditor && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-xl shadow space-y-6"
              >
                <h2 className="text-xl font-semibold text-gray-700">
                  {templateData.isEditing ? 'Edit Template' : 'Create New Template'}
                </h2>
                
                {/* Template Name and Subject */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Template name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter template name"
                      value={templateData.templateName}
                      onChange={(e) => setTemplateData({
                        ...templateData,
                        templateName: e.target.value
                      })}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter email subject"
                      value={templateData.subject}
                      onChange={(e) => setTemplateData({
                        ...templateData,
                        subject: e.target.value
                      })}
                      className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>

                {/* Attachments */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Attachments (multiple)
                  </label>
                  <div className="space-y-2">
                    <button
                      onClick={handleAddAttachment}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg px-4 py-2 text-sm font-medium shadow hover:scale-105 transition-transform inline-flex items-center"
                    >
                      <Paperclip size={16} className="mr-2" />
                      Add Attachment
                    </button>
                    {templateData.attachments.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                        {templateData.attachments.map((attachment) => (
                          <div
                            key={attachment.id}
                            className="flex items-center justify-between bg-gray-50 rounded-lg p-2 text-sm"
                          >
                            <div className="flex items-center min-w-0 flex-1">
                              <Paperclip size={14} className="text-gray-400 mr-2 flex-shrink-0" />
                              <span className="truncate" title={attachment.name}>
                                {attachment.name}
                              </span>
                              <span className="text-gray-500 ml-1 flex-shrink-0">
                                ({formatFileSize(attachment.size)})
                              </span>
                            </div>
                            <button
                              onClick={() => handleRemoveAttachment(attachment.id)}
                              className="text-red-500 hover:text-red-700 ml-2 flex-shrink-0"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Variables */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Variables
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                    {variables.map((variable) => (
                      <button
                        key={variable.key}
                        onClick={() => handleInsertVariable(variable.key)}
                        className="text-left bg-gray-50 hover:bg-gray-100 rounded-lg p-2 text-sm transition-colors"
                      >
                        <div className="font-medium text-gray-700">{variable.label}</div>
                        <div className="text-gray-500 text-xs">{variable.key}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content Editor */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Template Content
                  </label>
                  <textarea
                    id="templateContent"
                    placeholder="Enter your email template content here. Use variables like {user}, {email}, etc."
                    value={templateData.content}
                    onChange={(e) => setTemplateData({
                      ...templateData,
                      content: e.target.value
                    })}
                    rows="10"
                    className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 font-mono text-sm"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 justify-end">
                  <button
                    onClick={() => {
                      setShowPreview(true);
                    }}
                    className="bg-blue-200 hover:bg-blue-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
                  >
                    <Eye size={16} className="inline mr-2" />
                    Preview
                  </button>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    className="bg-green-200 hover:bg-green-300 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
                  >
                    <Save size={16} className="inline mr-2" />
                    {templateData.isEditing ? 'Update Template' : 'Save Template'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Template Preview Modal */}
          <AnimatePresence mode="wait">
            {showPreview && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                onClick={() => setShowPreview(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-700">Template Preview</h3>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div>
                      <strong>Subject:</strong> {templateData.subject}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="whitespace-pre-wrap">{renderPreviewContent()}</div>
                    </div>
                    {templateData.attachments && templateData.attachments.length > 0 && (
                      <div>
                        <strong>Attachments:</strong>
                        <ul className="list-disc list-inside mt-2 text-sm text-gray-600">
                          {templateData.attachments.map((attachment) => (
                            <li key={attachment.id}>{attachment.name} ({formatFileSize(attachment.size)})</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Filters */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  Show
                  <input
                    type="number"
                    min="1"
                    className="mx-2 w-16 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    defaultValue={10}
                  />
                  records
                </label>
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  From
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
                <label className="flex items-center text-sm text-gray-700 whitespace-nowrap">
                  To
                  <input
                    type="date"
                    className="ml-2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </label>
              </div>
              <div className="flex items-center gap-4 w-full lg:w-max">
                <input
                  type="text"
                  placeholder="🔍 Search"
                  className="flex-grow border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-md shadow-sm hover:opacity-90 transition-opacity whitespace-nowrap">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Action shortcuts */}
          <motion.div className="bg-white p-6 rounded-xl shadow space-y-4">
            <div className="flex flex-wrap gap-4 justify-start">
              <button
                type="button"
                onClick={onAddListClick}
                className="bg-green-100 text-green-800 ring-2 ring-green-200 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➕ Add List
              </button>
              <button
                type="button"
                onClick={onAddDataClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➕ Add Data
              </button>
              <button
                type="button"
                onClick={onRemoveDataClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ➖ Remove Data
              </button>
              <button
                type="button"
                onClick={onVerifyEmailsClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                ✅ Verify Emails
              </button>
              <button
                type="button"
                onClick={onManageListsClick}
                className="bg-blue-100 text-blue-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform"
              >
                🛠️ Manage Lists
              </button>
            </div>
          </motion.div>

          {/* Templates Table */}
          <motion.div className="bg-white p-6 rounded-xl shadow overflow-x-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              📧 Email Templates
            </h2>
            
            <table className="min-w-full text-sm text-left border rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 font-semibold uppercase text-xs">
                <tr>
                  {[
                    "Sno",
                    "Type",
                    "Subject",
                    "Template Name",
                    "Created At",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="p-3 border-b text-center whitespace-nowrap"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <motion.tbody
                key={currentPage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white divide-y divide-gray-100"
              >
                {currentTemplates.map((template, i) => (
                  <tr key={template.id} className="text-center align-middle">
                    <td className="p-3">{template.sno}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                        <Mail size={12} className="mr-1" />
                        {template.type}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs truncate" title={template.subject}>
                      {template.subject}
                    </td>
                    <td className="p-3 max-w-xs truncate" title={template.templateName}>
                      {template.templateName}
                    </td>
                    <td className="p-3">{template.createdAt}</td>
                    <td className="p-3">
                      <div className="flex justify-center gap-2">
                        <Eye
                          size={18}
                          className="text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handlePreviewTemplate(template)}
                          title="Preview"
                        />
                        <Copy
                          size={18}
                          className="text-green-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleDuplicateTemplate(template)}
                          title="Duplicate"
                        />
                        <Pencil
                          size={18}
                          className="text-yellow-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleEditTemplate(template)}
                          title="Edit"
                        />
                        <Trash2
                          size={18}
                          className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
                          onClick={() => handleDeleteTemplate(i)}
                          title="Delete"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </motion.tbody>
            </table>
          </motion.div>
        </div>
      </motion.div>

      {/* Pagination */}
      <motion.div className="w-full px-4 sm:px-6 py-10 bg-gray-100">
        <motion.div className="flex flex-col sm:flex-row items-center justify-between text-sm text-gray-700 gap-4">
          <div>
            Showing {templates.length === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, templates.length)} of{" "}
            {templates.length} records
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span>Page {currentPage}</span>
            <button
              className="bg-gradient-to-l from-blue-500/70 to-blue-400/60 text-gray-800 rounded-full px-5 py-2 text-sm font-medium shadow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleNext}
              disabled={currentPage === Math.ceil(templates.length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Toast */}
      {toast.message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
          toast.type === 'success' 
            ? 'bg-green-100 text-green-700 border border-green-200' 
            : 'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default EmailTemplate;