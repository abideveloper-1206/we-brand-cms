'use client'
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, Upload } from 'lucide-react';

export default function ExportImportButtons() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    window.location.href = '/api/products/export-excel';
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/products/import-excel', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        alert('Products imported successfully!');
        router.refresh();
      } else {
        const err = await res.json();
        alert('Import failed: ' + (err.error || err.message || 'Unknown error'));
      }
    } catch (e) {
      alert('Error during import.');
    } finally {
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <>
      <style>{`
        .export-import-container {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: -28px !important;
          margin-bottom: -10px !important;
          pointer-events: none;
        }
        .export-import-container > * {
          pointer-events: auto;
        }
        .btn-custom-gold {
          background-color: #faad03 !important;
          border-color: #faad03 !important;
          color: #fff !important;
          border-style: solid !important;
          border-width: 1px !important;
          border-radius: 20px !important;
          padding: 8px 24px !important;
          font-weight: bold !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
        .btn-custom-gold-outline {
          background-color: transparent !important;
          border-color: #faad03 !important;
          color: #faad03 !important;
          border-style: solid !important;
          border-width: 1px !important;
          border-radius: 20px !important;
          padding: 8px 24px !important;
          font-weight: bold !important;
          display: inline-flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
      `}</style>
      <div className="export-import-container">
        <button 
          onClick={handleExport}
          className="btn btn--size-medium btn-custom-gold"
          style={{ cursor: 'pointer' }}
          type="button"
        >
          <Download size={18} />
          Export to Excel
        </button>

        <button 
          onClick={() => fileInputRef.current?.click()}
          className="btn btn--size-medium btn-custom-gold-outline"
          style={{ cursor: 'pointer' }}
          disabled={loading}
          type="button"
        >
          <Upload size={18} />
          {loading ? 'Importing...' : 'Import from Excel'}
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept=".xlsx, .xls"
          onChange={handleImport}
        />
      </div>
    </>
  );
}
