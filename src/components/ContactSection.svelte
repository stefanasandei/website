<script>
    import SectionTitle from "./SectionTitle.svelte";
</script>

<section>
    <SectionTitle>Contact</SectionTitle>

    <div class="space-y-3 text-base grid md:grid-cols-2">
        <div>
            <span class="text-muted-foreground">email:</span>
            <a
                href="mailto:asandei.stefanel@gmail.com"
                class="break-all text-foreground hover:text-primary hover:underline transition-colors"
            >
                asandei.stefanel@gmail.com
            </a>
        </div>
        <div>
            <span class="text-muted-foreground">github:</span>
            <a
                href="https://github.com/stefanasandei"
                target="_blank"
                rel="noopener noreferrer"
                class="text-foreground hover:text-primary hover:underline transition-colors"
            >
                stefanasandei
            </a>
        </div>
        <div>
            <span class="text-muted-foreground">linkedin:</span>
            <a
                href="https://linkedin.com/in/stefan-asandei"
                target="_blank"
                rel="noopener noreferrer"
                class="text-foreground hover:text-primary hover:underline transition-colors"
            >
                stefan-asandei
            </a>
        </div>
        <!-- <div>
            <span class="text-muted-foreground">orcid:</span>
            <a
                href="https://orcid.org/0009-0000-4691-3903"
                target="_blank"
                rel="noopener noreferrer"
                class="text-foreground hover:text-primary hover:underline transition-colors"
            >
                0009-0000-4691-3903
            </a>
        </div> -->
        <div>
            <span class="text-muted-foreground">discord:</span>
            <span class="text-foreground">stefan_asandei</span>
        </div>
    </div>
</section>
