import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'src', 'collections')
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'))

const componentStr = `          admin: {
            components: {
              Field: '@/components/fields/CustomUploadField'
            }
          },`

let updatedCount = 0

for (const file of files) {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf-8')
  
  if (content.includes("type: 'upload'") && !content.includes('CustomUploadField')) {
    // We will do a simple regex replacement
    const regex = /type:\s*'upload',/g
    const replacement = `type: 'upload',\n${componentStr}`
    
    // Check if there's already an admin block right after
    // Actually, simple replace is fine for most fields in Barkat since they usually don't have custom admin blocks,
    // but to be safe, let's log any files that have `type: 'upload'` and `admin:` nearby.
    content = content.replace(regex, replacement)
    fs.writeFileSync(filePath, content, 'utf-8')
    updatedCount++
    console.log('Updated:', file)
  }
}

console.log('Total files updated:', updatedCount)
