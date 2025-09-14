import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SpecificationsTable = ({ specifications }) => {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev?.[sectionName]
    }));
  };

  if (!specifications || Object.keys(specifications)?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">No Specifications Available</h3>
        <p className="text-text-secondary">Detailed specifications for this product are not currently available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(specifications)?.map(([sectionName, specs]) => {
        const isExpanded = expandedSections?.[sectionName] !== false; // Default to expanded

        return (
          <div key={sectionName} className="bg-surface border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(sectionName)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors duration-200"
            >
              <h3 className="text-lg font-medium text-text-primary capitalize">
                {sectionName?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}
              </h3>
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary" 
              />
            </button>
            {isExpanded && (
              <div className="border-t border-border">
                <div className="divide-y divide-border">
                  {Object.entries(specs)?.map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center p-4">
                      <div className="sm:w-1/3 mb-1 sm:mb-0">
                        <span className="text-sm font-medium text-text-primary">
                          {key?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}
                        </span>
                      </div>
                      <div className="sm:w-2/3">
                        <span className="text-sm text-text-secondary">
                          {Array.isArray(value) ? value?.join(', ') : value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SpecificationsTable;