import { writeFileSync } from "node:fs";

const site = {
  name: "Bright Future Foundation",
  description:
    "A modern NGO website for education, healthcare, environmental conservation, skill development, community service, donations, volunteering, stories, projects, gallery, partners, blog, FAQ, and contact.",
};

const nav = [
  ["About", "about.html"],
  ["Programs", "programs.html"],
  ["Stories", "stories.html"],
  ["Volunteer", "volunteer.html"],
  ["Projects", "projects.html"],
  ["Gallery", "gallery.html"],
  ["Blog", "blog.html"],
  ["Contact", "contact.html"],
];

const images = {
  hero: "assets/img/hero.jpg",
  education: "assets/img/education.jpg",
  healthcare: "assets/img/healthcare.jpg",
  environment: "assets/img/environment.jpg",
  skills: "assets/img/skills.jpg",
  volunteer: "assets/img/volunteer.jpg",
  stories: "assets/img/stories.jpg",
  gallery: "assets/img/gallery.jpg",
};

const programs = [
  {
    title: "Education",
    href: "education.html",
    code: "ED",
    image: images.education,
    copy: "Learning hubs, scholarships, digital literacy labs, and mentoring for first-generation learners.",
  },
  {
    title: "Healthcare",
    href: "healthcare.html",
    code: "HC",
    image: images.healthcare,
    copy: "Mobile clinics, screenings, nutrition support, and maternal wellness outreach.",
  },
  {
    title: "Environment",
    href: "environment.html",
    code: "EC",
    image: images.environment,
    copy: "Tree care, waste reduction, water stewardship, and youth climate leadership.",
  },
  {
    title: "Skill Development",
    href: "skill-development.html",
    code: "SD",
    image: images.skills,
    copy: "Job readiness, entrepreneurship training, financial literacy, and livelihood groups.",
  },
];

const stats = [
  ["48K+", "children supported"],
  ["120", "community health camps"],
  ["82K", "trees planted"],
  ["3,600", "active volunteers"],
];

const partners = [
  "EduCare Alliance",
  "GreenWorld",
  "HealthFirst",
  "SkillBridge",
  "CityBank CSR",
  "Open Learning Lab",
];

function head(title, description = site.description) {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${description}" />
    <title>${title} | ${site.name}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="styles.css" />
  </head>`;
}

function header(active = "") {
  const links = nav
    .map(([label, href]) => `<a ${active === href ? 'aria-current="page"' : ""} href="${href}">${label}</a>`)
    .join("");

  return `<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header" data-header>
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="${site.name} home">
          <span class="brand-mark" aria-hidden="true">BF</span>
          <span>${site.name}</span>
        </a>
        <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
          <span class="sr-only">Toggle navigation</span>
          <span></span><span></span><span></span>
        </button>
        <div class="nav-menu" id="nav-menu">
          ${links}
          <a class="nav-donate" ${active === "donate.html" ? 'aria-current="page"' : ""} href="donate.html">Donate</a>
        </div>
      </nav>
    </header>`;
}

function footer() {
  return `<footer class="footer">
      <div>
        <a class="brand" href="index.html">
          <span class="brand-mark" aria-hidden="true">BF</span>
          <span>${site.name}</span>
        </a>
        <p>Registered nonprofit supporting brighter futures through education, health, environment, skills, and community action.</p>
      </div>
      <nav class="footer-links" aria-label="Footer links">
        <a href="programs.html">Programs</a>
        <a href="donate.html">Donate</a>
        <a href="volunteer.html">Volunteer</a>
        <a href="faq.html">FAQ</a>
        <a href="contact.html">Contact</a>
      </nav>
      <div class="social-links" aria-label="Social media links">
        <a href="#" aria-label="Facebook">Fb</a>
        <a href="#" aria-label="Instagram">Ig</a>
        <a href="#" aria-label="LinkedIn">In</a>
        <a href="#" aria-label="YouTube">Yt</a>
      </div>
    </footer>
    <script src="script.js"></script>`;
}

function statGrid() {
  return `<div class="stat-grid">${stats
    .map(([value, label]) => `<div class="stat reveal"><strong>${value}</strong><span>${label}</span></div>`)
    .join("")}</div>`;
}

function newsletter() {
  return `<section class="newsletter section compact reveal" aria-label="Newsletter subscription">
      <div>
        <h2>Get impact updates in your inbox.</h2>
        <p>Monthly stories, volunteer openings, and campaign milestones.</p>
      </div>
      <form class="newsletter-form">
        <label class="sr-only" for="newsletter-email">Email address</label>
        <input id="newsletter-email" type="email" placeholder="Email address" required />
        <button class="btn btn-secondary" type="submit">Subscribe</button>
      </form>
    </section>`;
}

function pageHero({ eyebrow, title, copy, image }) {
  return `<section class="page-hero" style="--hero-image: url('${image}')">
      <div class="page-hero-inner reveal">
        <p class="eyebrow">${eyebrow}</p>
        <h1>${title}</h1>
        <p>${copy}</p>
      </div>
    </section>`;
}

function layout({ file, active, title, description, hero, body }) {
  writeFileSync(
    file,
    `${head(title, description)}
  <body>
    ${header(active)}
    <main id="main">
      ${hero || ""}
      ${body}
    </main>
    ${footer()}
  </body>
</html>
`,
    "utf8"
  );
}

function programCards() {
  return programs
    .map(
      (program) => `<article class="photo-card reveal">
        <img src="${program.image}" alt="${program.title} program in action" />
        <div class="card-body">
          <span class="mini-mark">${program.code}</span>
          <h3>${program.title}</h3>
          <p>${program.copy}</p>
          <a class="text-link" href="${program.href}">Explore ${program.title}</a>
        </div>
      </article>`
    )
    .join("");
}

function donationForm() {
  return `<form class="donation-card reveal" aria-label="Donation form">
      <div class="amounts" role="group" aria-label="Suggested donation amounts">
        <label><input type="radio" name="amount" value="25" checked />$25</label>
        <label><input type="radio" name="amount" value="50" />$50</label>
        <label><input type="radio" name="amount" value="100" />$100</label>
        <label><input type="radio" name="amount" value="250" />$250</label>
      </div>
      <label>Custom amount<input type="number" min="1" placeholder="$" /></label>
      <label>Email<input type="email" autocomplete="email" required /></label>
      <button class="btn btn-primary" type="submit">Donate Securely</button>
    </form>`;
}

function contactForm() {
  return `<form class="contact-form reveal" aria-label="Contact form">
      <label>Name<input type="text" name="name" autocomplete="name" required /></label>
      <label>Email<input type="email" name="email" autocomplete="email" required /></label>
      <label>Message<textarea name="message" rows="5" required></textarea></label>
      <button class="btn btn-primary" type="submit">Send Message</button>
    </form>`;
}

layout({
  file: "index.html",
  active: "index.html",
  title: "Home",
  hero: `<section class="home-hero" style="--hero-image: url('${images.hero}')">
      <div class="hero-inner reveal">
        <p class="eyebrow">Community powered change</p>
        <h1>Building brighter futures through care, learning, and action.</h1>
        <p>Bright Future Foundation partners with communities to expand access to education, healthcare, green spaces, and dignified livelihood opportunities.</p>
        <div class="hero-actions">
          <a class="btn btn-primary" href="donate.html">Donate</a>
          <a class="btn btn-secondary" href="volunteer.html">Become a Volunteer</a>
        </div>
      </div>
    </section>`,
  body: `<section class="section compact" aria-label="Impact statistics">${statGrid()}</section>
    <section class="section split">
      <div class="section-copy reveal">
        <p class="eyebrow">Mission and vision</p>
        <h2>Equity begins where communities are heard.</h2>
        <p>We remove barriers to essential services and create locally led pathways for learning, wellness, environmental resilience, and economic confidence.</p>
        <a class="text-link" href="about.html">Read our story</a>
      </div>
      <img class="rounded-photo reveal" src="${images.volunteer}" alt="Volunteers supporting a community service event" />
    </section>
    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Featured programs</p>
        <h2>Four pillars of measurable impact</h2>
      </div>
      <div class="card-grid four">${programCards()}</div>
    </section>
    <section class="section tinted">
      <div class="section-heading reveal">
        <p class="eyebrow">Success stories</p>
        <h2>Change that feels personal</h2>
      </div>
      <div class="card-grid three">
        <article class="quote-card reveal"><p>"The after-school lab helped me prepare for exams and become the first in my family to enter college."</p><h3>Asha, scholarship student</h3></article>
        <article class="quote-card reveal"><p>"A community health camp caught my condition early. I am working again and supporting my family."</p><h3>Ravi, health participant</h3></article>
        <article class="quote-card reveal"><p>"Our group learned tailoring, pricing, and savings. We now run our own micro-enterprise."</p><h3>Meena, skills graduate</h3></article>
      </div>
      <a class="btn btn-primary section-cta reveal" href="stories.html">View Stories</a>
    </section>
    <section class="section">
      <div class="section-heading reveal">
        <p class="eyebrow">Explore the foundation</p>
        <h2>More ways to connect with the work</h2>
      </div>
      <div class="feature-list">
        <a class="feature-link reveal" href="projects.html"><span>Projects</span><strong>Learning hubs, maternal wellness, and green streets.</strong></a>
        <a class="feature-link reveal" href="gallery.html"><span>Gallery</span><strong>Realistic field photography from programs and community events.</strong></a>
        <a class="feature-link reveal" href="partners.html"><span>Partners</span><strong>Organizations and CSR teams helping us scale responsibly.</strong></a>
        <a class="feature-link reveal" href="faq.html"><span>FAQ</span><strong>Answers about donations, volunteering, and transparency.</strong></a>
      </div>
    </section>
    ${newsletter()}`,
});

layout({
  file: "about.html",
  active: "about.html",
  title: "About",
  hero: pageHero({
    eyebrow: "About us",
    title: "A foundation built with communities, not just for them.",
    copy: "We combine local leadership, transparent program design, and long-term partnerships to create durable change.",
    image: images.volunteer,
  }),
  body: `<section class="section split">
      <div class="section-copy reveal">
        <p class="eyebrow">Mission</p>
        <h2>Remove barriers to opportunity.</h2>
        <p>Our mission is to make essential services easier to reach for families who face economic, geographic, or social barriers.</p>
      </div>
      <div class="info-panel reveal">
        <h3>Our vision</h3>
        <p>A future where every child can learn, every family can access care, and every neighborhood has the resources to thrive with dignity.</p>
      </div>
    </section>
    <section class="section compact">${statGrid()}</section>
    <section class="section">
      <div class="section-heading reveal"><p class="eyebrow">Values</p><h2>How we work</h2></div>
      <div class="card-grid three">
        <article class="simple-card reveal"><h3>Local ownership</h3><p>Programs are shaped with community leaders, families, teachers, health workers, and youth volunteers.</p></article>
        <article class="simple-card reveal"><h3>Transparent impact</h3><p>We track participation, outcomes, spending, and feedback so partners can see what changes over time.</p></article>
        <article class="simple-card reveal"><h3>Dignity first</h3><p>Every service is designed to respect privacy, choice, and the strengths already present in each community.</p></article>
      </div>
    </section>`,
});

layout({
  file: "programs.html",
  active: "programs.html",
  title: "Programs",
  hero: pageHero({
    eyebrow: "Programs",
    title: "Integrated services for stronger communities.",
    copy: "Education, healthcare, environment, and skill development programs work together so progress in one area supports the others.",
    image: images.education,
  }),
  body: `<section class="section"><div class="card-grid four">${programCards()}</div></section>`,
});

const programPages = [
  {
    file: "education.html",
    title: "Education",
    image: images.education,
    active: "programs.html",
    heading: "Learning spaces that keep students moving forward.",
    copy:
      "We create safe study rooms, bridge classes, mentorship circles, and scholarship support for learners who need consistent encouragement.",
    bullets: ["After-school learning hubs", "Scholarships and supplies", "Digital literacy labs", "Mentor circles for exam readiness"],
  },
  {
    file: "healthcare.html",
    title: "Healthcare",
    image: images.healthcare,
    active: "programs.html",
    heading: "Preventive care that reaches families early.",
    copy:
      "Mobile health camps and local volunteers help families access screenings, referrals, nutrition guidance, and maternal wellness support.",
    bullets: ["Mobile clinics", "Maternal and child health", "Preventive screenings", "Nutrition and referral support"],
  },
  {
    file: "environment.html",
    title: "Environment",
    image: images.environment,
    active: "programs.html",
    heading: "Cleaner, greener neighborhoods led by residents.",
    copy:
      "We support tree care, waste segregation, water stewardship, and youth climate clubs that make environmental action local and practical.",
    bullets: ["Tree planting and care", "Waste reduction drives", "Water stewardship", "Youth climate leadership"],
  },
  {
    file: "skill-development.html",
    title: "Skill Development",
    image: images.skills,
    active: "programs.html",
    heading: "Skills that turn confidence into income.",
    copy:
      "Training programs help young adults and women build job readiness, business basics, digital confidence, and savings habits.",
    bullets: ["Job readiness workshops", "Entrepreneurship training", "Financial literacy", "Women-led livelihood groups"],
  },
];

for (const page of programPages) {
  layout({
    file: page.file,
    active: page.active,
    title: page.title,
    hero: pageHero({
      eyebrow: "Program",
      title: page.heading,
      copy: page.copy,
      image: page.image,
    }),
    body: `<section class="section split">
        <img class="rounded-photo reveal" src="${page.image}" alt="${page.title} program activity" />
        <div class="section-copy reveal">
          <p class="eyebrow">${page.title}</p>
          <h2>What this program includes</h2>
          <ul class="check-list">${page.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>
          <a class="btn btn-primary" href="donate.html">Fund this program</a>
        </div>
      </section>
      <section class="section compact">${statGrid()}</section>`,
  });
}

layout({
  file: "stories.html",
  active: "stories.html",
  title: "Success Stories",
  hero: pageHero({
    eyebrow: "Success stories",
    title: "Real progress, one family at a time.",
    copy: "Stories from students, patients, entrepreneurs, volunteers, and neighborhoods shaping their own future.",
    image: images.stories,
  }),
  body: `<section class="section">
      <div class="card-grid three">
        <article class="story-card reveal"><img src="${images.education}" alt="Student learning in a classroom" /><h3>Asha found a path to college</h3><p>Scholarship support, tutoring, and a quiet learning hub helped her finish exams with confidence.</p></article>
        <article class="story-card reveal"><img src="${images.healthcare}" alt="Healthcare worker supporting a patient" /><h3>Ravi returned to work</h3><p>A screening camp identified a health issue early and connected him to continued treatment.</p></article>
        <article class="story-card reveal"><img src="${images.skills}" alt="Young adults collaborating at a skills workshop" /><h3>Meena launched a small enterprise</h3><p>Skills training, pricing guidance, and savings support helped her group start earning reliably.</p></article>
      </div>
    </section>`,
});

layout({
  file: "volunteer.html",
  active: "volunteer.html",
  title: "Volunteer",
  hero: pageHero({
    eyebrow: "Volunteer",
    title: "Bring your time, skills, and care.",
    copy: "Volunteer in classrooms, health camps, environmental drives, mentorship programs, fundraising, and communications.",
    image: images.volunteer,
  }),
  body: `<section class="section split">
      <div class="section-copy reveal">
        <p class="eyebrow">Opportunities</p>
        <h2>Choose a role that fits your strengths.</h2>
        <ul class="check-list">
          <li>Teaching and tutoring support</li>
          <li>Healthcare camp coordination</li>
          <li>Environmental action teams</li>
          <li>Fundraising and communications</li>
          <li>Remote mentoring and research</li>
        </ul>
      </div>
      ${contactForm()}
    </section>`,
});

layout({
  file: "projects.html",
  active: "projects.html",
  title: "Projects",
  hero: pageHero({
    eyebrow: "Project showcase",
    title: "Current work in motion.",
    copy: "Focused projects help teams test, learn, and scale what works across education, health, environment, and livelihoods.",
    image: images.gallery,
  }),
  body: `<section class="section">
      <div class="card-grid three">
        <article class="photo-card reveal"><img src="${images.education}" alt="Students in a learning hub" /><div class="card-body"><h3>Learning Hubs for Rural Students</h3><p>Solar-powered study rooms, tablets, and trained facilitators for underserved villages.</p></div></article>
        <article class="photo-card reveal"><img src="${images.healthcare}" alt="Community healthcare project" /><div class="card-body"><h3>Healthy Mothers Initiative</h3><p>Regular checkups, nutrition kits, counseling, and referral support for expecting mothers.</p></div></article>
        <article class="photo-card reveal"><img src="${images.environment}" alt="Community environmental project" /><div class="card-body"><h3>Green Streets Campaign</h3><p>Community-led tree care, waste segregation training, and local climate clubs.</p></div></article>
      </div>
    </section>`,
});

layout({
  file: "gallery.html",
  active: "gallery.html",
  title: "Gallery",
  hero: pageHero({
    eyebrow: "Image gallery",
    title: "Moments from the field.",
    copy: "A realistic photo gallery showing learning, care, service, conservation, and community collaboration.",
    image: images.gallery,
  }),
  body: `<section class="section">
      <div class="gallery-grid">
        ${[
          ["Learning circle", images.education],
          ["Health outreach", images.healthcare],
          ["Tree planting", images.environment],
          ["Community service", images.volunteer],
          ["Skills workshop", images.skills],
          ["Neighborhood gathering", images.stories],
          ["Field visit", images.gallery],
          ["Volunteer coordination", images.hero],
        ]
          .map(([caption, src]) => `<figure class="gallery-item reveal"><img src="${src}" alt="${caption}" /><figcaption>${caption}</figcaption></figure>`)
          .join("")}
      </div>
    </section>`,
});

layout({
  file: "partners.html",
  active: "partners.html",
  title: "Partners",
  hero: pageHero({
    eyebrow: "Partners",
    title: "Collaboration helps good work travel farther.",
    copy: "We partner with schools, hospitals, companies, community groups, and local governments to scale practical solutions.",
    image: images.volunteer,
  }),
  body: `<section class="section">
      <div class="partner-grid">${partners.map((name) => `<div class="logo-tile reveal">${name}</div>`).join("")}</div>
    </section>
    <section class="section split">
      <div class="section-copy reveal"><p class="eyebrow">Corporate and institutional partnerships</p><h2>Build a partnership around measurable outcomes.</h2><p>Partner with us on grants, employee volunteering, in-kind support, field visits, reporting, and long-term program expansion.</p></div>
      <a class="cta-panel reveal" href="contact.html"><span>Start a partnership conversation</span></a>
    </section>`,
});

layout({
  file: "blog.html",
  active: "blog.html",
  title: "Blog",
  hero: pageHero({
    eyebrow: "Blog",
    title: "Stories, updates, and field notes.",
    copy: "Read practical reflections from our program coordinators, volunteers, and community partners.",
    image: images.education,
  }),
  body: `<section class="section">
      <div class="card-grid three">
        <article class="simple-card reveal"><p class="tag">Education</p><h3>How community mentors help students stay in school</h3><p>Practical lessons from learning hub coordinators and volunteer tutors.</p><a class="text-link" href="contact.html">Read more</a></article>
        <article class="simple-card reveal"><p class="tag">Healthcare</p><h3>Preventive care starts with trust</h3><p>Why local health volunteers are essential to reaching families early.</p><a class="text-link" href="contact.html">Read more</a></article>
        <article class="simple-card reveal"><p class="tag">Environment</p><h3>From saplings to shaded streets</h3><p>What it takes to keep urban trees alive beyond planting day.</p><a class="text-link" href="contact.html">Read more</a></article>
      </div>
    </section>`,
});

layout({
  file: "donate.html",
  active: "donate.html",
  title: "Donate",
  hero: pageHero({
    eyebrow: "Donate",
    title: "Your gift moves work from idea to impact.",
    copy: "Every contribution supports transparent, locally accountable programs across learning, health, environment, and skills.",
    image: images.hero,
  }),
  body: `<section class="section split">
      <div class="section-copy reveal">
        <p class="eyebrow">Donation page</p>
        <h2>Choose a giving level or enter your own amount.</h2>
        <p>Donations help fund learning materials, mobile health camps, saplings, training supplies, and community coordinators.</p>
        <ul class="check-list"><li>$25 funds learning materials</li><li>$50 supports health camp supplies</li><li>$100 sponsors skill training kits</li><li>$250 helps launch a community project</li></ul>
      </div>
      ${donationForm()}
    </section>`,
});

layout({
  file: "faq.html",
  active: "faq.html",
  title: "FAQ",
  hero: pageHero({
    eyebrow: "FAQ",
    title: "Common questions, clear answers.",
    copy: "Learn how donations, volunteering, partnerships, and program reporting work.",
    image: images.stories,
  }),
  body: `<section class="section faq-list">
      <details class="reveal"><summary>How are donations used?</summary><p>Funds support program delivery, field staff, learning materials, health camps, environmental drives, and transparent monitoring.</p></details>
      <details class="reveal"><summary>Can I volunteer remotely?</summary><p>Yes. Remote volunteers help with mentoring, design, translation, research, fundraising, and communications.</p></details>
      <details class="reveal"><summary>Do you partner with companies?</summary><p>We collaborate with CSR teams on employee volunteering, grants, skills training, and impact reporting.</p></details>
      <details class="reveal"><summary>Can I support a specific program?</summary><p>Yes. You can direct your gift toward education, healthcare, environment, or skill development from the donation page.</p></details>
    </section>`,
});

layout({
  file: "contact.html",
  active: "contact.html",
  title: "Contact",
  hero: pageHero({
    eyebrow: "Contact",
    title: "Start a conversation.",
    copy: "Reach out about donations, volunteering, partnerships, program visits, and media requests.",
    image: images.volunteer,
  }),
  body: `<section class="section contact-layout">
      <div class="contact-panel">${contactForm()}</div>
      <div class="map-panel reveal">
        <iframe title="Google Map showing Bright Future Foundation service area" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=New%20Delhi%20India&output=embed"></iframe>
      </div>
    </section>`,
});
