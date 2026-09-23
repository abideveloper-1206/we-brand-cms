async function run() { 
  const res = await fetch('http://localhost:3005/admin/create-first-user'); 
  const html = await res.text(); 
  const start = html.indexOf('<main'); 
  const end = start + 500; 
  console.log(html.substring(Math.max(0, start), end)); 
} 
run();
