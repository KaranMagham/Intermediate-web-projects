
function toggleAccordion(btn) {
    const answer = btn.parentElement.nextElementSibling;
    const plusIcon = btn.querySelector('.plus-icon');
    const crossIcon = btn.querySelector('.cross-icon');

    answer.classList.toggle('max-h-0');
    answer.classList.toggle('max-h-[500px]'); 

    plusIcon.classList.toggle('hidden');
    crossIcon.classList.toggle('hidden');
}
