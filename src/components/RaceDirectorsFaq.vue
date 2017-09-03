<template>
<div class="row justify-content-center no-gutters">
    <div class="col-12 col-sm-8 col-md-8 col-lg-6">
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <h1>Race Director FAQ</h1>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2>What is Racepass all about?</h2>
            <p>As a group of former (and current) Google employees, we’ve seen 
                the value of organizing information and make it easier to find. 
                When we learned that registration in endurance racing was on the 
                decline, we wanted to take what we’ve learned at Google and try to 
                make it easier for runners to find the right race event or get 
                involved with the sport for the first time. Our hope is that by lowering 
                this barrier of entry, we can help the racing industry continue to grow.</p>
            <rp-question id="q33">
                <span slot="question">What is Racepass all about? How does it work?</span>
                <p slot="answer">Our mission is to help runners to run more races, and in turn for your races to have more runners. Racepass subscribers buy a certain amount of race credits and give us consent to register them for their desired races. Racepass then registers the runner directly with your race always using your preferred channels (e.g. your race management platform or provider) driving 100% of the retail value to you. Our goal is to build a product that is good for runners, and good for race directors.</p>
            </rp-question>
            <rp-question id="q34">
                <span slot="question">How does Racepass partner with races?</span>
                <p slot="answer">Racepass integrates directly and indirectly with races. If you see your race listed and we do not have a direct relationship, Racepass has worked with your race management platform or is listing it through sourced events databases from such organizations as USATF, etc. When a runner expresses interest in running your race, Racepass then signs the runner up through your preferred channels.</p>
            </rp-question>
            <rp-question id="q35">
                <span slot="question">I don't see my race. How do I get it listed?</span>
                <p slot="answer">If your race is not listed (and you want it to be) contact our partnerships team, <a href="mailto:partners@racepass.com">partners@racepass.com</a> for inclusion and feel free to ask about other partnership opportunities.</p>
            </rp-question>
            <rp-question id="q36">
                <span slot="question">How can I get more registrants for my race?</span>
                <p slot="answer">Racepass has direct access to thousands of active runners and can help promote your race and increase registrants. Email our partnerships team, <a href="mailto:partners@racepass.com">partners@racepass.com</a> or fill out an inquiry form here.</p>
            </rp-question>
            <rp-question id="q37">
                <span slot="question">Are there advertising opportunities with Racepass?</span>
                <p slot="answer">Of course! There are multiple opportunities to promote relevant products, brands and events on our platform. For advertising inquiries contact <a href="mailto:partners@racepass.com">partners@racepass.com</a></p>
            </rp-question>
            <rp-question id="q38">
                <span slot="question">How can Racepass help me find sponsorships?</span>
                <p slot="answer">That's what we are working on next. Through building the largest network of races, we can facilitate corporate sponsorship opportunities that will help finance race operations. To find out more email our partnerships team, <a href="mailto:partners@racepass.com">partners@racepass.com</a></p>
            </rp-question>
            <rp-question id="q39">
                <span slot="question">I need help organizing my race, can Racepass help?</span>
                <p slot="answer">While Racepass does not supply race management or timing solutions, we can help promote and increase exposure to your race, helping it be a success. Please contact our partnerships team, <a href="mailto:partners@racepass.com">partners@racepass.com</a>, for further information.</p>
            </rp-question>
            <rp-question id="q41">
                <span slot="question">Does this put me at legal risk? Who's signing my waivers?</span>
                <p slot="answer">Racepass has worked with industry experts and attorneys to ensure race directors and event organizers are protected. First, every Racepass user accepts our <router-link to="/terms">Terms of Use</router-link> which provides indemnification, waives and discharges any future claims and releases any liability for event organizers. Second, we're working hard to develop a system that allows every runner to sign their own waiver, providing even more security and protection. If you have questions or concerns, we always advise you consult with your insurance and legal counsel and if they have questions they can contact <a href="mailto:legal@racepass.com">legal@racepass.com</a></p>
            </rp-question>
            <rp-question id="q42">
                <span slot="question">What if I want nothing to do with Racepass?</span>
                <p slot="answer">We would never hold it against you! While we'd hope you'd join us in building the next big thing for our sport, we understand if you do not wish for runners or sponsors to see your event. If that is the case, you can always contact <a href="mailto:support@racepass.com">support@racepass.com</a>, or read <a href="https://medium.com/racepass/for-race-directors-453332990ac2" target="_blank">for more information</a> about Racepass.</p>
            </rp-question>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script>
export default {
  name: 'rp-race-directors-faq',
  components: {
    'rp-question': () => import('@/components/Question')
  }
}
</script>
