<template>
  <div>
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
            <h2>What is Racepass?</h2>
            <p>Racepass is a subscription-based annual pass that helps runners run as many races as they can muster.</p>
            <rp-question id="q2">
              <span slot="question">Where can I use Racepass?</span>
              <p slot="answer">Racepass can be used at over 5,000 race events across the nation and more are being added everyday.</p>
            </rp-question>
            <rp-question id="q19">
              <span slot="question">I don’t see the race I want to run. What can I do?</span>
              <p slot="answer">You can help us by sending the race details (name, location, length, type, etc) to <a href="mailto:support@racepass.com">support@racepass.com</a> and we’ll work on getting you access to the race behind the scenes. </p>
            </rp-question>
            <rp-question id="q3">
              <span slot="question">How many races can I run?</span>
              <p slot="answer">Each Racepass plan is different. The unlimited pass offers you the chance to run as much as you can (each runner can be signed up for a max of 5 races at one time). Check out our pricing tiers for complete plan details.</p>
            </rp-question>
            <rp-question id="q4">
              <span slot="question">When does Racepass membership begin?</span>
              <p slot="answer">You can begin signing up for races immediately after completing your purchase.</p>
            </rp-question>
            <rp-question id="q5">
              <span slot="question">Does my Racepass auto-renew?</span>
              <p slot="answer">Only if you want it to. We think that each runner has to make the concious commitment to run every year and we don't like contracts. Feel free to cancel anytime!</p>
            </rp-question>
            <rp-question id="q6">
              <span slot="question">What are the benefits of Racepass?</span>
              <p slot="answer">Racepass eliminates the administrative headache of finding, registering and recruiting friends for races. It also allows you to run as many races as you can, tracking your times to help you train and run faster. It also provides you the flexibility to change or cancel races and not have to lose your money. See our cancelation policy below for more details. </p>
            </rp-question>
            <rp-question id="q9">
              <span slot="question">Is there a cancellation policy?</span>
              <p slot="answer">Just like with your hammies, flexibility is a good thing. You can cancel your Racepass at anytime! To cancel your Racepass, contact <a href="mailto:support@racepass.com">support@racepass.com.</a></p>
            </rp-question>
            <rp-question id="q10">
              <span slot="question">Can I refer my friends to Racepass?</span>
              <p slot="answer">Yes! Ask us for a unique promo code and we'll send you one! That can help you save your friends money upon registration. For your own promo code email <a href="mailto:support@racepass.com">support@racepass.com.</a></p>
            </rp-question>
            <rp-question id="q11">
              <span slot="question">How do I receive my packet and chip for race day?</span>
              <p slot="answer">Upon registration of the race, the race will notify you of race day activities and logistics. You will be able to pick up your packet and chip at the race expo just like normal.</p>
            </rp-question>
            <rp-question id="q12">
              <span slot="question">What if I already individually registered for my races?</span>
              <p slot="answer">If you have already registered for a race, we salute you! Feel free to use your Racepass to find and register for training run races to get you ready for your big day! Eventually you will be able to pick your start date so you can choose when your Racepass begins, but it's still in progress.</p>
            </rp-question>
            <rp-question id="q13">
              <span slot="question">What about races with lotteries or qualifying times?</span>
              <p slot="answer">Of course there are certain races we can’t guarantee entry (think Boston, NYCM, LA, etc.) but we are working hard to secure bibs for our runners so stay tuned. But in the meantime, there are also over 5,000 races to choose from and help you train towards qualifying and running the majors!</p>
            </rp-question>
            <rp-question id="q14">
              <span slot="question">Is there an app for Racepass?</span>
              <p slot="answer">We are currently in the process of developing a mobile app, but for now the web-based app is responsive, accessible and fully functional on your mobile phone. If you have any problems contact <a href="mailto:support@racepass.com">support@racepass.com.</a></p>
            </rp-question>
            <rp-question id="q15">
              <span slot="question">Is there a trial membership available?</span>
              <p slot="answer">Racepass guarantees customer satisfaction, so while a trial membership does not exist, there is no contractual commitment - if you're not satisfied and feel you need to cancel you must certainly can. To cancel your account contact <a href="mailto:support@racepass.com">support@racepass.com.</a></p>
            </rp-question>
            <rp-question id="q16">
              <span slot="question">How much does Racepass cost?</span>
              <p slot="answer">Racepass plans start at $195. Check out our pricing page for complete plan details.</p>
            </rp-question>
            <rp-question id="q18">
              <span slot="question">Is there a long-term commitment for Racepass?</span>
              <p slot="answer"> There is no contractual commitment - Feel free to cancel at anytime you can through contacting <a href="mailto:support@racepass.com">support@racepass.com.</a>. </p>
            </rp-question>
            <rp-question id="q20">
              <span slot="question">Can I give Racepass as a gift?</span>
              <p slot="answer">Yes! Racepass makes a great gift, we’ll have that functionality soon!</p>
            </rp-question>
            <rp-question id="q22">
              <span slot="question">What are the age limits for Racepass?</span>
              <p slot="answer">Racepass is for runners 18 years and older. </p>
            </rp-question>
            <rp-question id="q23">
              <span slot="question">Are all debit and credit cards accepted?</span>
              <p slot="answer">Racepass accepts all major debit and credit cards. Our first customers even paid cash at a run club in Palo Alto, CA :)</p>
            </rp-question>
            <rp-question id="q25">
              <span slot="question">I’ve lost my password, how can I recover or change it?</span>
              <p slot="answer">Let <a href="mailto:support@racepass.com">support@racepass.com</a> know, and we'll get you sorted.</p>
            </rp-question>
            <rp-question id="q26">
              <span slot="question">Can I transfer my Racepass or race registration to someone else?</span>
              <p slot="answer">Racepass and individual race registrations cannot be transferred to other runners.</p>
            </rp-question>
            <rp-question id="q27">
              <span slot="question">What if I have to change or cancel a race? </span>
              <p slot="answer">One of the many benefits of Racepass is the flexibility it offers. As long as it’s more than 14 calendar days from race day, you can cancel any race at any time. If it is closer than 14 days then the race credit will be used.</p>
            </rp-question>
            <rp-question id="refund">
              <span slot="question">Is there a refund policy if I cancel my Racepass membership?</span>
              <p slot="answer">Upon cancellation, all subsequent race registrations will be cancelled and the full registration amount of any race within 14 calendar days will be deducted from the refund as well. The remaining amount will be returned to you via your method of payment within 3-5 business days.</p>
            </rp-question>
            <rp-question id="q29">
              <span slot="question">What if I cancel my membership without registering for any races?</span>
              <p slot="answer">No problem, we’ll send you a full refund!</p>
            </rp-question>
            <rp-question id="q30">
              <span slot="question">How can I reach customer service for Racepass?</span>
              <p slot="answer">You can always email <a href="mailto:support@racepass.com">support@racepass.com</a> and our team will get back to you within 24 hours.</p>
            </rp-question>
            <rp-question id="q31">
              <span slot="question">Can I use Racepass for my friends and family?</span>
              <p slot="answer">Currently, we only offer individual memberships which are non-transferable and can only be used by the account holder. We hope to be able to add couples and family plans in the future! </p>
            </rp-question>
            <rp-question id="q32">
              <span slot="question">What if the race I want to run is sold out?</span>
              <p slot="answer">If a race is sold out, we cannot provide you with registration. You’ll be notified that the race is full and no more registrants will be accepted.</p>
            </rp-question>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'rp-runners-faq',
  components: {
    'rp-question': () => import('@/components/Question')
  }
}
</script>

