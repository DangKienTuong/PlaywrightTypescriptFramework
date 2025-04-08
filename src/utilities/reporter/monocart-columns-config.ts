export const FORMATTED_TAGS = {
    smoke: {
        style: {
            background: '#6F9913'
        }
    },
    sanity: {
        style: 'background:#178F43;',
    },
    critical: {
        background: '#c00'
    },
    fast: {
        background: 'green'
    },
    slow: {
        background: '#d00'
    },
    Positive: {
        style: {
            background: '#0000FF'
        },
    },
    Negative: {
        background: '#FFA500'
    }
} as const;


export const FORMATTED_COLUMNS = (defaultColumns: any) => {
    // Define new columns upfront for readability
    const newColumns = [
        {
            id: 'owner',
            name: 'Owner',
            align: 'center',
            searchable: true,
            styleMap: { 'font-weight': 'normal' }
        },
        {
            id: 'test_id',
            name: 'Test-Case Id',
            align: 'center',
            searchable: true,
            styleMap: { 'font-weight': 'normal' }
        },
        {
            id: 'tags',
            name: 'Tags',
            width: 150,
            formatter: 'tags'
        },
        {
            id: 'story_id',
            name: 'User Story Id',
            width: 100,
            searchable: true,
            styleMap: 'font-weight:normal;',
        }
    ];

    // Column visibility configuration: true = visible, false = invisible
    const columnVisibilityConfig: { [key: string]: boolean } = {
        type: false,
        retry: false,
        expectedStatus: false,
        location: false,
        outcome: false,
    };

    // Function to set column visibility
    const updateColumnVisibility = (columns: any[], visibilityConfig: { [key: string]: boolean }) => {
        columns.forEach((column) => {
            if (visibilityConfig[column.id] !== undefined) {
                column.invisible = !visibilityConfig[column.id]; // Set invisible based on config
            }
        });
    };

    // Insert new columns before 'duration'
    const updatedColumns = [...defaultColumns];
    const index = updatedColumns.findIndex((column: any) => column.id === 'duration');
    if (index !== -1) {
        updatedColumns.splice(index, 0, ...newColumns);
    }

    // Update visibility based on the configuration
    updateColumnVisibility(updatedColumns, columnVisibilityConfig);

    // Modify the formatter for the duration column
    const durationColumn = updatedColumns.find((column: any) => column.id === 'duration');
    if (durationColumn) {
        durationColumn.formatter = (value: any) => (typeof value === 'number' && value)
            ? `<i>${value.toLocaleString()} ms</i>`
            : value;
    }

    // Modify title column formatter
    const titleColumn = updatedColumns.find((column: any) => column.id === 'title');
    if (titleColumn) {
        titleColumn.formatter = function (value: any, rowItem: any, columnItem: any, cellNode: any) {
            const previousFormatter = this.getFormatter('tree');
            const v = previousFormatter(value, rowItem, columnItem, cellNode);
            return rowItem.type === 'step' ? `${v}<div style="position:absolute;top:0;right:5px;">✔</div>` : v;
        };
    }

    // Modify status column formatter
    const statusColumn = updatedColumns.find((column: any) => column.id === 'status');
    if (statusColumn) {
        statusColumn.formatter = (value: any) => {
            const colorMap: { [key: string]: string } = {
                failed: 'red',
                passed: 'green',
                warning: 'orange',
            };
            const color = colorMap[value] || 'black';
            return `<b style="color:${color};">${value.toUpperCase()}</b>`;
        };
    }

    // Push description column at the end
    defaultColumns.push({
        id: 'description',
        name: 'Description',
        width: 300,
        markdown: true,
        searchable: true
    });

    return defaultColumns;  // Return the updated columns
};