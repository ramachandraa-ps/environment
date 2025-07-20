document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuBtn && mobileMenuBtn.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
            }
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding pane
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Chennai AQI Toggle
    const toggleButton = document.getElementById('toggle-view');
    const comparisonItems = document.querySelectorAll('.comparison-item');
    let showingBefore = true;
    
    if (toggleButton) {
        toggleButton.addEventListener('click', function() {
            if (showingBefore) {
                // Show only the "after" (clean) view
                comparisonItems[0].style.display = 'none';
                comparisonItems[1].style.display = 'block';
                toggleButton.textContent = 'Show Both Views';
            } else {
                // Show both views
                comparisonItems[0].style.display = 'block';
                comparisonItems[1].style.display = 'block';
                toggleButton.textContent = 'See the Difference';
            }
            showingBefore = !showingBefore;
        });
    }
    
    // AQI Rankings Data
    const chennaiAreas = [
        { rank: 1, location: "Adyar", aqi: 45, status: "Good" },
        { rank: 2, location: "Besant Nagar", aqi: 52, status: "Moderate" },
        { rank: 3, location: "T. Nagar", aqi: 68, status: "Moderate" },
        { rank: 4, location: "Velachery", aqi: 75, status: "Moderate" },
        { rank: 5, location: "Anna Nagar", aqi: 82, status: "Moderate" },
        { rank: 6, location: "Guindy", aqi: 95, status: "Moderate" },
        { rank: 7, location: "Perungudi", aqi: 105, status: "Unhealthy for Sensitive Groups" },
        { rank: 8, location: "Manali", aqi: 118, status: "Unhealthy for Sensitive Groups" },
        { rank: 9, location: "Kodungaiyur", aqi: 132, status: "Unhealthy for Sensitive Groups" },
        { rank: 10, location: "Ennore", aqi: 156, status: "Unhealthy" }
    ];
    
    const tamilNaduCities = [
        { rank: 1, location: "Kodaikanal", aqi: 32, status: "Good" },
        { rank: 2, location: "Ooty", aqi: 38, status: "Good" },
        { rank: 3, location: "Yercaud", aqi: 42, status: "Good" },
        { rank: 4, location: "Coimbatore", aqi: 58, status: "Moderate" },
        { rank: 5, location: "Madurai", aqi: 65, status: "Moderate" },
        { rank: 6, location: "Trichy", aqi: 72, status: "Moderate" },
        { rank: 7, location: "Salem", aqi: 85, status: "Moderate" },
        { rank: 8, location: "Chennai", aqi: 92, status: "Moderate" },
        { rank: 9, location: "Tiruppur", aqi: 108, status: "Unhealthy for Sensitive Groups" },
        { rank: 10, location: "Thoothukudi", aqi: 115, status: "Unhealthy for Sensitive Groups" }
    ];
    
    // Populate AQI Rankings
    function populateRankings(data) {
        const rankingTable = document.getElementById('ranking-data');
        if (!rankingTable) return;
        
        rankingTable.innerHTML = '';
        
        data.forEach(item => {
            const row = document.createElement('tr');
            
            let statusClass = '';
            if (item.status === 'Good') statusClass = 'status-good';
            else if (item.status === 'Moderate') statusClass = 'status-moderate';
            else if (item.status === 'Unhealthy for Sensitive Groups') statusClass = 'status-sensitive';
            else if (item.status === 'Unhealthy') statusClass = 'status-unhealthy';
            
            row.innerHTML = `
                <td>${item.rank}</td>
                <td>${item.location}</td>
                <td>${item.aqi}</td>
                <td><span class="aqi-status ${statusClass}">${item.status}</span></td>
            `;
            
            rankingTable.appendChild(row);
        });
    }
    
    // Initialize rankings
    const rankingArea = document.getElementById('ranking-area');
    if (rankingArea) {
        populateRankings(chennaiAreas);
        
        rankingArea.addEventListener('change', function() {
            if (this.value === 'chennai') {
                populateRankings(chennaiAreas);
            } else {
                populateRankings(tamilNaduCities);
            }
        });
    }
    
    // AQI Calculator
    const calculateAqiBtn = document.getElementById('calculate-aqi');
    if (calculateAqiBtn) {
        calculateAqiBtn.addEventListener('click', function() {
            const pm25 = parseFloat(document.getElementById('pm25').value) || 0;
            const pm10 = parseFloat(document.getElementById('pm10').value) || 0;
            const o3 = parseFloat(document.getElementById('o3').value) || 0;
            const co = parseFloat(document.getElementById('co').value) || 0;
            const so2 = parseFloat(document.getElementById('so2').value) || 0;
            const no2 = parseFloat(document.getElementById('no2').value) || 0;
            
            // Simple AQI calculation (this is a simplified version)
            let aqiValues = [];
            
            // PM2.5 calculation
            if (pm25 > 0) {
                if (pm25 <= 12) aqiValues.push(pm25 * 4.17);
                else if (pm25 <= 35.4) aqiValues.push(((pm25 - 12) * 2.1) + 50);
                else if (pm25 <= 55.4) aqiValues.push(((pm25 - 35.4) * 2.5) + 100);
                else if (pm25 <= 150.4) aqiValues.push(((pm25 - 55.4) * 0.53) + 150);
                else if (pm25 <= 250.4) aqiValues.push(((pm25 - 150.4) * 0.5) + 200);
                else aqiValues.push(((pm25 - 250.4) * 0.4) + 300);
            }
            
            // PM10 calculation
            if (pm10 > 0) {
                if (pm10 <= 54) aqiValues.push(pm10 * 0.93);
                else if (pm10 <= 154) aqiValues.push(((pm10 - 54) * 0.5) + 50);
                else if (pm10 <= 254) aqiValues.push(((pm10 - 154) * 0.5) + 100);
                else if (pm10 <= 354) aqiValues.push(((pm10 - 254) * 0.5) + 150);
                else if (pm10 <= 424) aqiValues.push(((pm10 - 354) * 0.71) + 200);
                else aqiValues.push(((pm10 - 424) * 0.57) + 300);
            }
            
            // O3 calculation (simplified)
            if (o3 > 0) {
                if (o3 <= 54) aqiValues.push(o3 * 0.93);
                else if (o3 <= 124) aqiValues.push(((o3 - 54) * 0.71) + 50);
                else if (o3 <= 164) aqiValues.push(((o3 - 124) * 1.25) + 100);
                else if (o3 <= 204) aqiValues.push(((o3 - 164) * 1.25) + 150);
                else if (o3 <= 404) aqiValues.push(((o3 - 204) * 0.25) + 200);
                else aqiValues.push(((o3 - 404) * 0.5) + 300);
            }
            
            // CO calculation (simplified)
            if (co > 0) {
                aqiValues.push(co * 10);
            }
            
            // SO2 calculation (simplified)
            if (so2 > 0) {
                if (so2 <= 35) aqiValues.push(so2 * 1.43);
                else if (so2 <= 75) aqiValues.push(((so2 - 35) * 1.25) + 50);
                else aqiValues.push(so2);
            }
            
            // NO2 calculation (simplified)
            if (no2 > 0) {
                if (no2 <= 53) aqiValues.push(no2 * 0.94);
                else if (no2 <= 100) aqiValues.push(((no2 - 53) * 0.85) + 50);
                else aqiValues.push(no2);
            }
            
            // Get the highest AQI value
            let aqi = 0;
            if (aqiValues.length > 0) {
                aqi = Math.max(...aqiValues);
                aqi = Math.round(aqi);
            }
            
            // Update result
            const resultValue = document.querySelector('.result-value');
            const resultLabel = document.querySelector('.result-label');
            
            if (resultValue && resultLabel) {
                resultValue.textContent = aqi;
                
                let status = '';
                let color = '';
                
                if (aqi <= 50) {
                    status = 'Good';
                    color = 'var(--aqi-good)';
                } else if (aqi <= 100) {
                    status = 'Moderate';
                    color = 'var(--aqi-moderate)';
                } else if (aqi <= 150) {
                    status = 'Unhealthy for Sensitive Groups';
                    color = 'var(--aqi-sensitive)';
                } else if (aqi <= 200) {
                    status = 'Unhealthy';
                    color = 'var(--aqi-unhealthy)';
                } else if (aqi <= 300) {
                    status = 'Very Unhealthy';
                    color = 'var(--aqi-very-unhealthy)';
                } else {
                    status = 'Hazardous';
                    color = 'var(--aqi-hazardous)';
                }
                
                resultLabel.textContent = status;
                resultValue.style.color = color;
            }
        });
    }
    
    // Pollution Chart Data
    const ctx = document.getElementById('pollutionChart').getContext('2d');
    
    // Sample AQI data for the past 6 months
    const pollutionData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Air Quality Index (AQI)',
                data: [120, 115, 95, 85, 75, 65],
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 2,
                tension: 0.3
            },
            {
                label: 'Renewable Energy Adoption (%)',
                data: [10, 15, 25, 30, 40, 45],
                backgroundColor: 'rgba(46, 204, 113, 0.2)',
                borderColor: 'rgba(46, 204, 113, 1)',
                borderWidth: 2,
                tension: 0.3
            }
        ]
    };

    // Create the chart
    const pollutionChart = new Chart(ctx, {
        type: 'line',
        data: pollutionData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (context.datasetIndex === 0) {
                                    label += context.parsed.y + ' AQI';
                                } else {
                                    label += context.parsed.y + '%';
                                }
                            }
                            return label;
                        }
                    }
                },
                legend: {
                    position: 'bottom'
                }
            }
        }
    });

    // Add smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation for elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card');
        
        elements.forEach(element => {
            const position = element.getBoundingClientRect();
            
            // If element is in viewport
            if(position.top < window.innerHeight && position.bottom >= 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animation
    document.querySelectorAll('.card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});// Dai
ly Eco-Challenge Functionality
const dailyTasks = [
    {
        title: "Use Chennai Metro",
        description: "Take the Chennai Metro Rail for your commute today instead of driving. The metro reduces traffic congestion and air pollution in the city.",
        impact: "High"
    },
    {
        title: "Plant a Native Tree",
        description: "Plant a native Tamil Nadu tree species like Neem, Peepal, or Banyan in your community. These trees are adapted to local conditions and support biodiversity.",
        impact: "High"
    },
    {
        title: "Beach Cleanup",
        description: "Spend 30 minutes collecting plastic waste at Marina Beach or Elliot's Beach. Chennai's coastline needs protection from plastic pollution.",
        impact: "High"
    },
    {
        title: "Water Conservation",
        description: "Chennai faces water scarcity issues. Collect and reuse greywater from your kitchen or bathroom for watering plants today.",
        impact: "Medium"
    },
    {
        title: "Use Public Transportation",
        description: "Skip the car today and use Chennai's MTC buses or share an auto-rickshaw for your commute. This reduces carbon emissions and air pollution.",
        impact: "High"
    },
    {
        title: "Plant or Water a Plant",
        description: "Plant a new sapling or water plants in your home or community. Plants absorb CO2 and release oxygen, improving Chennai's air quality.",
        impact: "Medium"
    },
    {
        title: "Reduce Water Usage",
        description: "Take shorter showers, fix leaky taps, and collect rainwater for plants. Water conservation is crucial for Chennai's sustainability.",
        impact: "Medium"
    },
    {
        title: "Go Plastic-Free Today",
        description: "Avoid single-use plastics completely for one day. Use reusable bags, bottles, and containers instead when shopping at local markets.",
        impact: "High"
    },
    {
        title: "Energy-Saving Hour",
        description: "Turn off all non-essential electrical appliances for one hour. Unplug devices that aren't in use to reduce phantom energy usage and help reduce Tamil Nadu's energy demand.",
        impact: "Medium"
    },
    {
        title: "Waste Segregation",
        description: "Properly segregate your waste into biodegradable and non-biodegradable categories today, following Chennai Corporation's waste management guidelines.",
        impact: "Medium"
    },
    {
        title: "Local Food Challenge",
        description: "Buy only locally produced Tamil Nadu food today from farmers markets. This reduces carbon emissions from transportation and supports local farmers.",
        impact: "Medium"
    },
    {
        title: "Digital Cleanup",
        description: "Delete unnecessary emails, files, and apps. Digital storage consumes energy in data centers, contributing to carbon emissions.",
        impact: "Low"
    },
    {
        title: "Educate Someone",
        description: "Share a fact about Chennai's air quality or renewable energy initiatives with a friend or family member. Spreading awareness creates change.",
        impact: "Medium"
    },
    {
        title: "Vegetarian Tamil Meal",
        description: "Enjoy a traditional Tamil vegetarian meal today. Tamil Nadu's plant-based cuisine is delicious and has a lower carbon footprint than meat-based meals.",
        impact: "Medium"
    },
    {
        title: "Support Local Eco-Friendly Business",
        description: "Purchase a product from a Chennai-based business that uses sustainable practices or sells eco-friendly products.",
        impact: "Medium"
    },
    {
        title: "Rainwater Harvesting Check",
        description: "Inspect your home's rainwater harvesting system or advocate for one in your apartment complex. Rainwater harvesting is mandatory in Chennai and crucial for water security.",
        impact: "High"
    },
    {
        title: "Cycle to Nearby Places",
        description: "Use a bicycle for short trips within your neighborhood today. Cycling reduces emissions and helps improve Chennai's air quality.",
        impact: "Medium"
    },
    {
        title: "Terrace Gardening",
        description: "Start or maintain a small garden on your terrace or balcony. Urban gardening helps reduce the urban heat island effect in Chennai.",
        impact: "Medium"
    },
    {
        title: "Collect Litter",
        description: "Spend 15 minutes collecting litter in your neighborhood or local park. Proper waste disposal prevents pollution.",
        impact: "Medium"
    },
    {
        title: "Repair, Don't Replace",
        description: "Fix something broken instead of buying new. Extending product life reduces waste and conserves resources.",
        impact: "Medium"
    }
];

function initDailyChallenge() {
    const currentDateElement = document.getElementById('current-date');
    const taskTitleElement = document.getElementById('task-title');
    const taskDescriptionElement = document.getElementById('task-description');
    const taskImpactElement = document.getElementById('task-impact-value');
    const completeTaskButton = document.getElementById('complete-task');
    const refreshTaskButton = document.getElementById('refresh-task');
    const tasksCompletedElement = document.getElementById('tasks-completed');
    const streakCountElement = document.getElementById('streak-count');
    const impactScoreElement = document.getElementById('impact-score');
    const completedListElement = document.getElementById('completed-list');
    
    // Initialize local storage if not exists
    if (!localStorage.getItem('sustainableChoices')) {
        localStorage.setItem('sustainableChoices', JSON.stringify({
            tasksCompleted: 0,
            streak: 0,
            impactScore: 0,
            lastCompleted: null,
            completedTasks: []
        }));
    }
    
    // Get data from local storage
    let userData = JSON.parse(localStorage.getItem('sustainableChoices'));
    
    // Update stats display
    function updateStats() {
        tasksCompletedElement.textContent = userData.tasksCompleted;
        streakCountElement.textContent = userData.streak;
        impactScoreElement.textContent = userData.impactScore;
    }
    
    // Update completed tasks list
    function updateCompletedList() {
        if (userData.completedTasks.length === 0) {
            completedListElement.innerHTML = '<li class="no-tasks">No tasks completed yet. Start your eco-journey today!</li>';
            return;
        }
        
        completedListElement.innerHTML = '';
        
        // Show only the last 5 completed tasks
        const recentTasks = userData.completedTasks.slice(-5).reverse();
        
        recentTasks.forEach(task => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.title}</span>
                <span class="completed-date">${task.date}</span>
            `;
            completedListElement.appendChild(li);
        });
    }
    
    // Set current date
    function setCurrentDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentDateElement.textContent = now.toLocaleDateString('en-US', options);
    }
    
    // Get a random task
    function getRandomTask() {
        const randomIndex = Math.floor(Math.random() * dailyTasks.length);
        return dailyTasks[randomIndex];
    }
    
    // Set daily task
    function setDailyTask() {
        const task = getRandomTask();
        taskTitleElement.textContent = task.title;
        taskDescriptionElement.textContent = task.description;
        taskImpactElement.textContent = task.impact;
        
        // Reset complete button
        completeTaskButton.textContent = 'Mark Complete';
        completeTaskButton.classList.remove('completed');
        completeTaskButton.disabled = false;
    }
    
    // Check streak
    function checkStreak() {
        const now = new Date();
        const today = now.toDateString();
        
        if (userData.lastCompleted) {
            const lastDate = new Date(userData.lastCompleted);
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            
            // If last completed was yesterday, continue streak
            if (lastDate.toDateString() === yesterday.toDateString()) {
                userData.streak += 1;
            } 
            // If last completed was before yesterday, reset streak
            else if (lastDate < yesterday) {
                userData.streak = 1;
            }
            // If already completed today, do nothing to streak
        }
        else {
            userData.streak = 1;
        }
        
        userData.lastCompleted = today;
    }
    
    // Complete task
    function completeTask() {
        // Add task animation
        const taskCard = document.getElementById('daily-task');
        taskCard.classList.add('task-complete-animation');
        setTimeout(() => {
            taskCard.classList.remove('task-complete-animation');
        }, 1000);
        
        // Update stats
        userData.tasksCompleted += 1;
        
        // Calculate impact score based on impact level
        let impactPoints = 5; // Default for Low
        if (taskImpactElement.textContent === 'Medium') {
            impactPoints = 10;
        } else if (taskImpactElement.textContent === 'High') {
            impactPoints = 15;
        }
        
        userData.impactScore += impactPoints;
        
        // Check and update streak
        checkStreak();
        
        // Add to completed tasks
        const now = new Date();
        const options = { month: 'short', day: 'numeric' };
        userData.completedTasks.push({
            title: taskTitleElement.textContent,
            date: now.toLocaleDateString('en-US', options),
            impact: taskImpactElement.textContent
        });
        
        // Save to local storage
        localStorage.setItem('sustainableChoices', JSON.stringify(userData));
        
        // Update UI
        updateStats();
        updateCompletedList();
        
        // Disable complete button
        completeTaskButton.textContent = 'Completed!';
        completeTaskButton.classList.add('completed');
        completeTaskButton.disabled = true;
    }
    
    // Initialize
    setCurrentDate();
    setDailyTask();
    updateStats();
    updateCompletedList();
    
    // Event listeners
    if (completeTaskButton) {
        completeTaskButton.addEventListener('click', completeTask);
    }
    
    if (refreshTaskButton) {
        refreshTaskButton.addEventListener('click', setDailyTask);
    }
}

// Initialize Daily Challenge if elements exist
if (document.getElementById('daily-challenge')) {
    initDailyChallenge();
}