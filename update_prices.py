with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

r = [
    ('<!-- Basico -->', '<!-- Essencial -->'),
    ('>Básico<', '>Essencial<'),
    ('Pra quem trabalha sozinho e quer sair do caderninho.', 'Para quem trabalha sozinho.'),
    ('>19<span class="text-2xl">,90</span>', '>49<span class="text-2xl font-semibold">,90</span>'),
    ('<!-- Profissional (destaque) -->', '<!-- Studio -->'),
    ('border-2 border-violet-600 shadow-xl space-y-6 relative md:-mt-4 md:mb-4', 'border border-violet-200 shadow-md space-y-6 relative'),
    ('font-bold uppercase tracking-widest whitespace-nowrap">Mais popular', 'font-semibold tracking-wide whitespace-nowrap">Mais escolhido'),
    ('>Profissional<', '>Studio<'),
    ('Pra quem tem equipe e quer controle total.', 'Para estúdios com equipe.'),
    ('>49<span class="text-2xl">,90</span>', '>89<span class="text-2xl font-semibold">,90</span>'),
    ('> Até 3 profissionais', '> Até 5 profissionais'),
    ('> Tudo do Básico', '> Tudo do Essencial'),
    ('<!-- Premium -->', '<!-- Master -->'),
    ('>Premium<', '>Master<'),
    ('Pra quem quer escalar e não perder nenhuma cliente.', 'Para redes e espaços grandes.'),
    ('>79<span class="text-2xl">,90</span>', '>129<span class="text-2xl font-semibold">,90</span>'),
    ('> Tudo do Profissional', '> Tudo do Studio'),
]

for old, new in r:
    count = html.count(old)
    html = html.replace(old, new, 1)
    print(f'{"OK" if count else "MISS"}: {old[:50]}')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
