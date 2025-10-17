#!/bin/bash
# Add ES6 exports back to all language data files

cd assets/js/language-data

for file in *-data.js; do
    # Skip if already has export
    if grep -q "^export {" "$file"; then
        echo "Skipping $file (already has exports)"
        continue
    fi

    # Extract the variable name from the file
    varname=$(grep -m1 "^const.*Resources = {" "$file" | sed 's/const \(.*\) = {/\1/')

    if [ -n "$varname" ]; then
        echo "Adding export to $file (variable: $varname)"
        echo "" >> "$file"
        echo "// ES6 Module Export" >> "$file"
        echo "export { $varname };" >> "$file"
        echo "export default $varname;" >> "$file"
    else
        echo "WARNING: Could not find variable in $file"
    fi
done

echo "Done!"
