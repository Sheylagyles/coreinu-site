/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });



    // ---- BMI (lbs/in) ----
const bmiForm = document.getElementById('bmiForm');
if (bmiForm) {
  const weightEl = document.getElementById('weight');
  const heightEl = document.getElementById('height');
  const resultWrap = document.getElementById('bmiResult');
  const bmiValueEl = document.getElementById('bmiValue');
  const bmiCategoryEl = document.getElementById('bmiCategory');
  const bmiExplainEl = document.getElementById('bmiExplain');

  bmiForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const weight = parseFloat(weightEl.value);
    const heightIn = parseFloat(heightEl.value);

    if (!weight || !heightIn || weight <= 0 || heightIn <= 0) {
      resultWrap.classList.remove('d-none');
      bmiValueEl.textContent = '--';
      bmiCategoryEl.textContent = 'Invalid input';
      bmiExplainEl.textContent = 'Please enter positive numbers for both weight and height.';
      return;
    }

    // BMI formula for imperial units
    const bmi = 703 * weight / (heightIn * heightIn);
    const bmiRounded = Math.round(bmi * 10) / 10;

    let category = '';
    let explanation = '';
    if (bmi < 18.5) {
      category = 'Underweight';
      explanation = 'Your BMI is below the normal range. Consider strength-building and nutrition strategies to support a healthy weight.';
    } else if (bmi < 25) {
      category = 'Normal weight';
      explanation = 'Your BMI is in the normal range. Keep up balanced activity and nutrition to maintain your results.';
    } else if (bmi < 30) {
      category = 'Overweight';
      explanation = 'Your BMI is above the normal range. Gentle, progressive activity and simple nutrition tweaks can help.';
    } else {
      category = 'Obese';
      explanation = 'Your BMI is well above the normal range. A joint-smart, low-impact plan can improve mobility, comfort, and health markers.';
    }

    resultWrap.classList.remove('d-none');
    bmiValueEl.textContent = bmiRounded.toFixed(1);
    bmiCategoryEl.textContent = category;
    bmiExplainEl.textContent = explanation + ' BMI is only one indicator—book a free call for a personalized plan.';
  });
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    // If you’re already preventing default to submit via fetch, keep that.
    // If you’re letting Formspree do a normal POST (page reload), you can
    // clone the values here and fire the SMS in parallel, then let the submit continue.
    const formData = new FormData(contactForm);
    const payload = {
      service: formData.get('service'),
      name: formData.get('name'),
      phone: formData.get('phone')
    };
    // Fire-and-forget the SMS request
    fetch('/.netlify/functions/sms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(() => {});
  });
}

});
