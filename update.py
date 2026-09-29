with open('newsletters.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()
with open('newsletters.html', 'w', encoding='utf-8') as f:
    f.writelines(lines[:71])
    f.write('''    <!-- Newsletters Section -->
    <section style="padding: 15vh 4vw; min-height: 70vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
        <h1 class="vm-heading" style="margin-bottom: 4vh; font-size: 8vw;">OUR<br><span class="outline-text">NEWSLETTERS</span></h1>
        
        <div style="display: flex; flex-direction: column; gap: 2vh; width: 100%; max-width: 600px;">
            <a href="https://www.geniobrain.com/images/newsletter/Issue%201_%20March%202025.pdf" target="_blank" class="btn-outline" data-cursor="hover" data-magnetic style="width: 100%; text-align: left; display: flex; justify-content: space-between; border-radius: 12px; font-size: 1.2rem; background: rgba(255,255,255,0.03);">
                <span>Issue 1: March 2025</span>
                <span>↗</span>
            </a>
            <a href="https://www.geniobrain.com/images/newsletter/Issue%202_%20April%202025.pdf" target="_blank" class="btn-outline" data-cursor="hover" data-magnetic style="width: 100%; text-align: left; display: flex; justify-content: space-between; border-radius: 12px; font-size: 1.2rem; background: rgba(255,255,255,0.03);">
                <span>Issue 2: April 2025</span>
                <span>↗</span>
            </a>
            <a href="https://www.geniobrain.com/images/newsletter/Issue%203_%20May%202025.pdf" target="_blank" class="btn-outline" data-cursor="hover" data-magnetic style="width: 100%; text-align: left; display: flex; justify-content: space-between; border-radius: 12px; font-size: 1.2rem; background: rgba(255,255,255,0.03);">
                <span>Issue 3: May 2025</span>
                <span>↗</span>
            </a>
            <a href="https://www.geniobrain.com/images/newsletter/Issue%204_%20June%202025.pdf" target="_blank" class="btn-outline" data-cursor="hover" data-magnetic style="width: 100%; text-align: left; display: flex; justify-content: space-between; border-radius: 12px; font-size: 1.2rem; background: rgba(255,255,255,0.03);">
                <span>Issue 4: June 2025</span>
                <span>↗</span>
            </a>
        </div>
    </section>
''')
    f.writelines(lines[426:])
