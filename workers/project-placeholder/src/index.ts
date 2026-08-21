/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
  async fetch(request: Request) {
    const url = new URL(request.url);
    // Extrae y sanitiza el subdominio                                                                         
    const rawSubdominio = url.hostname.split('.')[0];
    const subdominio = rawSubdominio.replace(/[^a-zA-Z0-9_-]/g, '');

    const html = `<!DOCTYPE html>                                                                              
    <html lang="es">                                                                                               
    <head>                                                                                                         
      <meta charset="UTF-8">                                                                                       
      <meta name="viewport" content="width=device-width, initial-scale=1.0">                                       
      <title>${subdominio}.yeipi.dev | En desarrollo</title>                                                       
      <link rel="icon" type="image/svg+xml" href="https://yeipi.dev/favicon.svg" />                                
      <style>                                                                                                      
        * { box-sizing: border-box; margin: 0; padding: 0; }                                                       
        body {                                                                                                     
          background-color: #0a0c10;                                                                               
          color: #f1f5f9;                                                                                          
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;               
          min-height: 100vh;                                                                                       
          display: flex;                                                                                           
          align-items: center;                                                                                     
          justify-content: center;                                                                                 
          padding: 1.5rem;                                                                                         
          -webkit-font-smoothing: antialiased;                                                                     
        }                                                                                                          
        ::selection { background-color: #d97706; color: #ffffff; }                                                 
                                                                                                                   
        .card {                                                                                                    
          background-color: rgba(18, 22, 31, 0.95);                                                                
          border: 1px solid #242b3b;                                                                               
          border-radius: 1rem;                                                                                     
          padding: 2.5rem 2rem;                                                                                    
          max-width: 32rem;                                                                                        
          width: 100%;                                                                                             
          text-align: center;                                                                                      
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);                                                        
        }                                                                                                          
                                                                                                                   
        .badge {                                                                                                   
          display: inline-flex;                                                                                    
          align-items: center;                                                                                     
          gap: 0.5rem;                                                                                             
          padding: 0.35rem 0.75rem;                                                                                
          background-color: #181d28;                                                                               
          border: 1px solid #242b3b;                                                                               
          border-radius: 0.375rem;                                                                                 
          font-size: 0.75rem;                                                                                      
          font-weight: 500;                                                                                        
          color: #cbd5e1;                                                                                          
          margin-bottom: 1.5rem;                                                                                   
        }                                                                                                          
        .badge-dot {                                                                                               
          width: 0.5rem;                                                                                           
          height: 0.5rem;                                                                                          
          border-radius: 9999px;                                                                                   
          background-color: #fbbf24;                                                                               
        }                                                                                                          
                                                                                                                   
        h1 {                                                                                                       
          font-size: 2rem;                                                                                         
          font-weight: 700;                                                                                        
          letter-spacing: -0.025em;                                                                                
          color: #f1f5f9;                                                                                          
          margin-bottom: 0.75rem;                                                                                  
        }                                                                                                          
        .accent { color: #fbbf24; }                                                                                
                                                                                                                   
        p {                                                                                                        
          color: #94a3b8;                                                                                          
          font-size: 1rem;                                                                                         
          line-height: 1.6;                                                                                        
          margin-bottom: 2rem;                                                                                     
        }                                                                                                          
                                                                                                                   
        .buttons {                                                                                                 
          display: flex;                                                                                           
          flex-direction: column;                                                                                  
          gap: 0.75rem;                                                                                            
          justify-content: center;                                                                                 
          align-items: center;                                                                                     
        }                                                                                                          
        @media (min-width: 640px) {                                                                                
          .buttons { flex-direction: row; }                                                                        
          h1 { font-size: 2.25rem; }                                                                               
        }                                                                                                          
                                                                                                                   
        .btn-primary {                                                                                             
          display: inline-flex;                                                                                    
          align-items: center;                                                                                     
          justify-content: center;                                                                                 
          gap: 0.5rem;                                                                                             
          background-color: #fbbf24;                                                                               
          color: #0a0c10;                                                                                          
          font-weight: 600;                                                                                        
          font-size: 0.875rem;                                                                                     
          padding: 0.65rem 1.25rem;                                                                                
          border-radius: 0.5rem;                                                                                   
          text-decoration: none;                                                                                   
          transition: background-color 0.15s ease;                                                                 
          width: 100%;                                                                                             
        }                                                                                                          
        .btn-primary:hover {                                                                                       
          background-color: #f59e0b;                                                                               
        }                                                                                                          
                                                                                                                   
        .btn-secondary {                                                                                           
          display: inline-flex;                                                                                    
          align-items: center;                                                                                     
          justify-content: center;                                                                                 
          gap: 0.5rem;                                                                                             
          background-color: #181d28;                                                                               
          color: #e2e8f0;                                                                                          
          border: 1px solid #242b3b;                                                                               
          font-weight: 500;                                                                                        
          font-size: 0.875rem;                                                                                     
          padding: 0.65rem 1.25rem;                                                                                
          border-radius: 0.5rem;                                                                                   
          text-decoration: none;                                                                                   
          transition: all 0.15s ease;                                                                              
          width: 100%;                                                                                             
        }                                                                                                          
        .btn-secondary:hover {                                                                                     
          background-color: #1f2533;                                                                               
          border-color: #475569;                                                                                   
          color: #ffffff;                                                                                          
        }                                                                                                          
                                                                                                                   
        @media (min-width: 640px) {                                                                                
          .btn-primary, .btn-secondary { width: auto; }                                                            
        }                                                                                                          
                                                                                                                   
        .footer-note {                                                                                             
          margin-top: 2rem;                                                                                        
          padding-top: 1.25rem;                                                                                    
          border-top: 1px solid rgba(36, 43, 59, 0.6);                                                             
          font-size: 0.75rem;                                                                                      
          color: #64748b;                                                                                          
        }                                                                                                          
      </style>                                                                                                     
    </head>                                                                                                        
    <body>                                                                                                         
                                                                                                                   
      <main class="card">                                                                                          
        <!-- Badge -->                                                                                             
        <div class="badge">                                                                                        
          <span class="badge-dot"></span>                                                                          
          <span>En desarrollo</span>                                                                               
        </div>                                                                                                     
                                                                                                                   
        <!-- Título -->                                                                                            
        <h1>${subdominio}<span class="accent">.yeipi.dev</span></h1>                                               
                                                                                                                   
        <!-- Descripción -->                                                                                       
        <p>Este proyecto está actualmente en fase de construcción activa y estará disponible muy pronto.</p>       
                                                                                                                   
        <!-- Botones -->                                                                                           
        <div class="buttons">                                                                                      
          <a href="https://yeipi.dev" class="btn-primary">                                                         
            ← Volver a yeipi.dev                                                                                   
          </a>                                                                                                     
                                                                                                                   
          <a href="https://github.com/yeipis" target="_blank" rel="noopener noreferrer" class="btn-secondary">     
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display: inline-block; flex-shrink: 0;">                                                                                                     
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" /> 
            </svg>                                                                                                 
            <span>GitHub</span>                                                                                    
          </a>                                                                                                     
        </div>                                                                                                     
                                                                                                                   
        <!-- Footer -->                                                                                            
        <div class="footer-note">                                                                                  
          yeipi.dev • Subdomain Preview                                                                            
        </div>                                                                                                     
      </main>                                                                                                      
                                                                                                                   
    </body>                                                                                                        
    </html>`;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
        "cache-control": "no-store"
      }
    });
  }
}; 