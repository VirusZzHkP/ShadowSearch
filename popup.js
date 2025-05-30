document.addEventListener('DOMContentLoaded', () => {
  const searchBtn = document.getElementById('searchBtn');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const modeLabel = document.getElementById('modeLabel');

const fileTypes = {
  images: ["png", "jpg", "jpeg", "gif", "bmp", "webp", "svg", "ico", "tiff"],
  videos: ["mp4", "webm", "mkv", "avi", "mov", "flv", "wmv", "mpeg"],
  audio: ["mp3", "wav", "ogg", "flac", "aac", "m4a"],
  documents: ["txt", "md", "doc", "docx", "odt", "rtf"],
  spreadsheets: ["xls", "xlsx", "csv"],
  presentations: ["ppt", "pptx", "key"],
  pdf: ["pdf"],
  compressed: ["zip", "rar", "7z", "tar", "gz", "bz2", "xz", "arc"],
  executables: ["exe", "msi", "apk", "bat", "sh", "bin", "appimage"],
  scripts: ["js", "ts", "py", "pl", "rb", "php", "c", "cpp", "h", "java", "class", "cs", "swift"],
  system: ["dll", "sys", "drv", "ini", "cfg", "cnf", "env", "properties", "toml", "yml"],
  fonts: ["woff", "woff2", "ttf", "otf", "eot"],
  passwordFiles: ["pwd", "passwd", "shadow", "htpasswd", "wp-config", "kdbx", "cred", "secrets", "keychain", "pfx"],
  loginFiles: ["login", "logon", "auth", "session", "token", "cookies", "signin", "cert", "jwt", "oauth"],
  databaseFiles: ["db", "sql", "sqlite", "mdb", "accdb", "frm", "ibd", "myd", "ndf", "ora"],
  logFiles: ["log", "csv", "json", "xml", "audit", "trace", "debug", "out", "err"],
  configurationFiles: ["cfg", "ini", "conf", "xml", "json", "yml", "toml", "env", "cnf", "properties"],
  backupFiles: ["bak", "backup", "tar", "old", "bkp", "arc"]
};


  searchBtn.addEventListener('click', () => {
    const keyword = document.getElementById('searchKeyword').value.trim();
    const site = document.getElementById('searchSite').value.trim();
    const searchEngine = document.getElementById('searchEngine').value;

    if (!keyword) {
      alert('Please enter a keyword!');
      return;
    }
    if (!searchEngine) {
      alert('Please select a search engine!');
      return;
    }

    // Collect selected filetype categories
    const selectedCategories = Array.from(document.querySelectorAll('.checkbox:checked')).map(cb => cb.value);

    // Build the filetype query
    let filetypeQuery = '';
    selectedCategories.forEach(category => {
      if (fileTypes[category]) {
        const types = fileTypes[category].map(ft => `filetype:${ft}`).join(' OR ');
        filetypeQuery += `(${types}) OR `;
      }
    });

    // Remove trailing ' OR ' if present
    filetypeQuery = filetypeQuery.trim().replace(/ OR$/, '');

    const siteQuery = site ? `site:${site}` : '';
    const query = `"${keyword}" ${siteQuery} ${filetypeQuery}`.trim();

    const url = `${searchEngine}${encodeURIComponent(query)}`;
    chrome.tabs.create({ url });
  });

 // Dark mode logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
  modeLabel.textContent = '☀️ Light Mode';
} else {
  modeLabel.textContent = '🌙 Dark Mode';
}

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    modeLabel.textContent = '☀️ Light Mode';
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    modeLabel.textContent = '🌙 Dark Mode';
  }
});
});
