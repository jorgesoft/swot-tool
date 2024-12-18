const mappings = {
    strengths: "strengths",
    weaknesses: "weaknesses",
    opportunities: "opportunities",
    threats: "threats",
};

document.getElementById('saveBtn').addEventListener('click', () => {
    const data = {};

    // Gather data from textareas
    Object.keys(mappings).forEach(id => {
        data[mappings[id]] = document.getElementById(id).value.split('\n').filter(line => line.trim() !== '');
    });

    // Convert data to YAML format
    const yamlContent = jsyaml.dump(data);
    const blob = new Blob([yamlContent], { type: 'text/yaml;charset=utf-8;' });

    // Ask the user for a filename
    const filename = prompt("Enter a name for your file (without extension):", "swot_analysis") || "swot_analysis";
    const fullFilename = `${filename}.yaml`;

    // Create download link and trigger download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fullFilename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

document.getElementById('loadFile').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = jsyaml.load(e.target.result);

            // Populate textareas with loaded data
            Object.keys(mappings).forEach(id => {
                document.getElementById(id).value = (data[mappings[id]] || []).join('\n');
            });
        };
        reader.readAsText(file);
    }
});
