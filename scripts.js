document.addEventListener('DOMContentLoaded', function () {
            // --- Lógica para el acordeón de Preguntas Frecuentes (FAQ) ---
            const faqToggles = document.querySelectorAll('.faq-toggle');
            faqToggles.forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const content = toggle.nextElementSibling;
                    const icon = toggle.querySelector('span:last-child');
                    // Cerrar otros acordeones abiertos
                    faqToggles.forEach(otherToggle => {
                        if (otherToggle !== toggle) {
                            otherToggle.nextElementSibling.style.maxHeight = null;
                            otherToggle.querySelector('span:last-child').classList.remove('rotate-180');
                        }
                    });
                    // Abrir o cerrar el actual
                    if (content.style.maxHeight) {
                        content.style.maxHeight = null;
                        icon.classList.remove('rotate-180');
                    } else {
                        content.style.maxHeight = content.scrollHeight + "px";
                        icon.classList.add('rotate-180');
                    }
                });
            });

            // --- Lógica para el Bot de Ayuda ---
            const chatOpenButton = document.getElementById('chat-open-button');
            const chatCloseButton = document.getElementById('chat-close-button');
            const chatWindow = document.getElementById('chat-window');
            const chatForm = document.getElementById('chat-form');
            const chatInput = document.getElementById('chat-input');
            const chatMessages = document.getElementById('chat-messages');

            // Abrir el chat
            chatOpenButton.addEventListener('click', () => {
                chatWindow.classList.remove('hidden');
                chatWindow.classList.add('flex');
                chatOpenButton.classList.add('hidden');
            });

            // Cerrar el chat
            chatCloseButton.addEventListener('click', () => {
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
                chatOpenButton.classList.remove('hidden');
            });

            // Enviar mensaje
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const userMessage = chatInput.value.trim();
                if (userMessage === '') return;

                // Mostrar mensaje del usuario
                appendMessage(userMessage, 'user');
                chatInput.value = '';

                // Generar y mostrar respuesta del bot
                setTimeout(() => {
                    const botResponse = getBotResponse(userMessage);
                    appendMessage(botResponse, 'bot');
                }, 1000);
            });
            
            function appendMessage(message, sender) {
                const messageWrapper = document.createElement('div');
                const messageBubble = document.createElement('div');
                
                messageWrapper.classList.add('flex');
                messageBubble.classList.add('chat-bubble', 'p-3', 'rounded-lg');

                if (sender === 'user') {
                    messageWrapper.classList.add('justify-end');
                    messageBubble.classList.add('bg-gray-600', 'text-white');
                } else {
                    messageBubble.classList.add('bg-cyan-600', 'text-white');
                }

                messageBubble.innerHTML = `<p>${message}</p>`;
                messageWrapper.appendChild(messageBubble);
                chatMessages.appendChild(messageWrapper);
                chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll
            }

            function getBotResponse(message) {
                const lowerCaseMessage = message.toLowerCase();

                if (lowerCaseMessage.includes('precio') || lowerCaseMessage.includes('costo') || lowerCaseMessage.includes('valor')) {
                    return 'El libro tiene un costo de $25.00 USD. Es un pago único con acceso de por vida.';
                }
                if (lowerCaseMessage.includes('formato') || lowerCaseMessage.includes('pdf')) {
                    return 'El libro se entrega en formato PDF de alta calidad, compatible con todos tus dispositivos.';
                }
                if (lowerCaseMessage.includes('garantía') || lowerCaseMessage.includes('devolución')) {
                    return '¡Sí! Tienes una garantía de satisfacción de 7 días. Si no te gusta, te devolvemos tu dinero.';
                }
                 if (lowerCaseMessage.includes('comprar') || lowerCaseMessage.includes('pago')) {
                    return 'Puedes comprarlo haciendo clic en cualquiera de los botones de "Comprar Ahora" en la página. Te llevará a la pasarela de pago segura.';
                }
                if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('gracias')) {
                    return '¡De nada! Estoy aquí para ayudarte si tienes más preguntas.';
                }
                if (lowerCaseMessage.includes('bolivia') || lowerCaseMessage.includes('santa cruz')) {
                    return 'En este PDF encontrará la información de Binance y USDT para nuestro país.';
                }                
                if (lowerCaseMessage.includes('depositar') || lowerCaseMessage.includes('retirar')) {
                    return 'Si tambien encontrará las formas mas seguras de realizar transacciones desde BOlivia';
                }                

                return 'Lo siento, no entendí esa pregunta. Intenta preguntar sobre el precio, formato, garantía o cómo comprar el libro.';
            }
        });
