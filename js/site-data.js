// Pulls travel entries and blog posts from Supabase and renders them into
// the page. Add/edit/delete rows in the Supabase Table Editor -- no code
// changes or rebuilds needed, the site picks them up on next page load.

const SUPABASE_URL = 'https://hehpnangwfcyhgbbpohn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhlaHBuYW5nd2ZjeWhnYmJwb2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NTQyMjksImV4cCI6MjEwMDEzMDIyOX0.Ixc71-C94hnGOD2gyJ4nWsTPu8TiuV0evr9f6YC0oNk';

async function fetchTable(table, query) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
      headers: {
            apikey: SUPABASE_ANON_KEY,
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`
                      }
                        });
                          if (!res.ok) throw new Error(`Supabase fetch failed: ${res.status}`);
                            return res.json();
                            }

                            function escapeHtml(str) {
                              if (!str) return '';
                                return String(str).replace(/[&<>"']/g, c => ({
                                    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
                                      }[c]));
                                      }

                                      async function renderTravel() {
                                        const grid = document.getElementById('trips-grid');
                                          if (!grid) return;
                                            try {
                                                const rows = await fetchTable('travel_entries', 'select=*&order=sort_order.asc,created_at.desc');
                                                    if (!rows.length) return; // keep the placeholder cards already in the page

                                                        grid.innerHTML = rows.map(r => `
                                                              <div class="card">
                                                                      ${r.photo_url ? `<img src="${escapeHtml(r.photo_url)}" alt="${escapeHtml(r.destination)}" loading="lazy">` : ''}
                                                                              <h3>${escapeHtml(r.destination)}</h3>
                                                                                      <div class="meta">${escapeHtml(r.month_year || '')}</div>
                                                                                              <p style="color:var(--text-dim); font-size:0.92rem; margin:0;">${escapeHtml(r.description || '')}</p>
                                                                                                    </div>
                                                                                                        `).join('');
                                                                                                        
                                                                                                            const note = document.getElementById('trips-placeholder-note');
                                                                                                                if (note) note.remove();
                                                                                                                  } catch (err) {
                                                                                                                      console.warn('Could not load travel entries from Supabase:', err);
                                                                                                                        }
                                                                                                                        }
                                                                                                                        
                                                                                                                        async function renderBlog() {
                                                                                                                          const list = document.getElementById('posts-list');
                                                                                                                            if (!list) return;
                                                                                                                              try {
                                                                                                                                  const rows = await fetchTable('blog_posts', 'select=*&order=post_date.desc,created_at.desc');
                                                                                                                                      if (!rows.length) return; // keep the placeholder card already in the page
                                                                                                                                      
                                                                                                                                          list.innerHTML = rows.map(r => `
                                                                                                                                                <div class="card">
                                                                                                                                                        <h3>${escapeHtml(r.title)}</h3>
                                                                                                                                                                <div class="meta">${r.post_date ? new Date(r.post_date + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : ''}</div>
                                                                                                                                                                        <p style="color:var(--text-dim); font-size:0.95rem; margin:0;">${escapeHtml(r.excerpt || '')}</p>
                                                                                                                                                                              </div>
                                                                                                                                                                                  `).join('');
                                                                                                                                                                                  
                                                                                                                                                                                      const note = document.getElementById('blog-placeholder-note');
                                                                                                                                                                                          if (note) note.remove();
                                                                                                                                                                                            } catch (err) {
                                                                                                                                                                                                console.warn('Could not load blog posts from Supabase:', err);
                                                                                                                                                                                                  }
                                                                                                                                                                                                  }
                                                                                                                                                                                                  
                                                                                                                                                                                                  renderTravel();
                                                                                                                                                                                                  renderBlog();
