---
layout: content
title: Courses
permalink: /courses/
---

Here are some of the relevant courses that I've taken (or am currently taking) here at UC Berkeley, alongside some of my personal thoughts/experiences about them (WIP)! 

--- 

| Course Number| Instructor | Course Title|
|:-------------:|:--------------:|:--------------:|
| PHYSICS 5A | Shimon Kolkowitz | <a href="#comment-5A" class="comment-link">Introductory Mechanics and Relativity</a>|
| PHYSICS 5B | Joseph Orenstein | Introductory Electromagnetism; Waves and Optics |
| PHYSICS 5C | Ronnie Spitzer | Introductory Thermodynamics and Quantum Mechanics | 
| PHYSICS 5BL | Daniel Barsky | Introduction to Experimental Physics I |
| PHYSICS 5CL | Daniel Barsky | Introduction to Experimental Physics II |
| PHYSICS 89 | Mae Teo | Introduction to Mathematical Physics |
| PHYSICS 137A | Chien-I Chiang | Quantum Mechanics |
| PHYSICS 105 | Edgar Knobloch | Analytic Mechanics |
| PHYSICS 110A | Chien-I Chiang | Electromagnetism and Optics|
| PHYSICS 112 | Andrew Charman | Introduction to Statistical and Thermal Physics |
| PHYSICS 188 | TBD | Bayesian Data Analysis and Machine Learning for Physical Sciences |
| MATH 53 | Maciej Zworski | Multivariable Calculus |
| MATH 104 | Ian Francis | Introduction to Real Analysis |
| CS61A | John Denero | The Structure and Interpretation of Computer Programs |
| STAT 20 | Evan Munro | Introduction to Probability and Statistics |
| MEC ENG 106 | Alexis Kaminsky | Fluid Mechanics |
| CHEM 1A | Alexis Shustermann/Eric Neuscamman | General Chemistry |
| CHEM 1AL | Michelle Dousky | General Chemistry Laboratory |
| CHEM 3A | Peter Marsden | Chemical Structure and Reactivity |
| CHEM 3AL | Katie Blackford | Organic Chemistry Laboratory |
| BIOLOGY 1A | Andrea Gomez/Jennifer Doudna/Karine Gibbs | General Biology Lecture |
| BIOLOGY 1AL | Lorenzo Lones | General Biology Laboratory |
| BIOLOGY 1B | Caroline Williams/Charles Marshall/Michal Shuldman | General Biology Lecture and Laboratory |



----

<div id="course-comments" style="display:none; margin-top: 40px;">
    <h2>Personal Course Notes</h2>
    <hr>
    <div id="comment-5A" class="course-note" style="display:none;">
        <h3 class="note-title">PHYSICS 5A: Introductory Mechanics and Relativity (Kolkowitz)</h3>
        <p>
            This was a **fantastic introduction** to mechanics. The course moved quickly but maintained a strong focus on conceptual understanding rather than just computation. Professor Kolkowitz did an excellent job of bringing in modern applications, especially relating relativity concepts to current physics research.
        </p>
        <p>
            *Recommendation:* Focus heavily on the weekly problem sets—they were the real learning tool.
        </p>
    </div>
</div>

<script>
    // This function ensures the script runs only after the page's HTML structure is fully loaded.
    document.addEventListener('DOMContentLoaded', function() {
        const commentLinks = document.querySelectorAll('.comment-link');
        const commentsContainer = document.getElementById('course-comments');
        const allNotes = document.querySelectorAll('.course-note');

        commentLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevents the default jump behavior

                // 1. Ensure the overall comments section is visible
                commentsContainer.style.display = 'block';

                // 2. Hide all existing notes (to clear any previous selection)
                allNotes.forEach(note => {
                    note.style.display = 'none';
                });

                // 3. Get the ID from the link's href (e.g., "#comment-5A" -> "comment-5A")
                const targetId = this.getAttribute('href').substring(1); 
                const targetComment = document.getElementById(targetId);

                // 4. Show the specific, relevant comment and smoothly scroll to it
                if (targetComment) {
                    targetComment.style.display = 'block';
                    // Scroll to the *parent container* to ensure the H2 ("Personal Course Notes") is visible
                    commentsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });
</script>