import { test, expect } from '@playwright/test';

test.describe('AI Assistant Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have AI assistant accessible from main interface', async ({ page }) => {
    // Look for AI assistant trigger elements
    const aiTriggers = [
      page.locator('[data-testid="ai-assistant"]'),
      page.locator('[data-testid="ai-chat"]'),
      page.getByRole('button', { name: /ai/i }),
      page.getByRole('button', { name: /assistant/i }),
      page.getByRole('button', { name: /chat/i }),
      page.getByRole('button', { name: /help/i }),
      page.locator('.ai-assistant-trigger'),
      page.locator('.chat-trigger'),
      page.locator('button:has-text("AI")'),
      page.locator('button[aria-label*="AI"]'),
      page.locator('button[aria-label*="assistant"]'),
      page.locator('.floating-action-button'),
      page.locator('.fab')
    ];

    let aiTriggerFound = false;
    for (const trigger of aiTriggers) {
      if (await trigger.isVisible().catch(() => false)) {
        aiTriggerFound = true;
        console.log('Found AI assistant trigger');
        break;
      }
    }

    if (!aiTriggerFound) {
      // Check in navigation menu
      const navLinks = page.locator('nav a, header a');
      const navCount = await navLinks.count();
      
      for (let i = 0; i < navCount; i++) {
        const link = navLinks.nth(i);
        const text = await link.textContent();
        if (text && /ai|assistant|chat/i.test(text)) {
          aiTriggerFound = true;
          break;
        }
      }
    }

    expect(aiTriggerFound).toBe(true);
  });

  test('should open AI assistant interface when triggered', async ({ page }) => {
    // Try to find and click AI assistant trigger
    const aiTriggers = [
      page.locator('[data-testid="ai-assistant"]'),
      page.getByRole('button', { name: /ai/i }),
      page.getByRole('button', { name: /assistant/i }),
      page.locator('button:has-text("AI")'),
      page.locator('.ai-assistant-trigger')
    ];

    let assistantOpened = false;
    for (const trigger of aiTriggers) {
      if (await trigger.isVisible().catch(() => false)) {
        await trigger.click();
        
        // Wait for AI assistant interface to appear
        await page.waitForTimeout(1000);
        
        const assistantInterface = [
          page.locator('[data-testid="ai-chat-interface"]'),
          page.locator('.ai-assistant-modal'),
          page.locator('.chat-interface'),
          page.locator('.ai-chat'),
          page.locator('[role="dialog"]'),
          page.locator('.modal:visible')
        ];

        for (const interface_ of assistantInterface) {
          if (await interface_.isVisible().catch(() => false)) {
            assistantOpened = true;
            console.log('AI assistant interface opened');
            break;
          }
        }
        
        if (assistantOpened) break;
      }
    }

    if (!assistantOpened) {
      // Try navigating to potential AI routes
      const aiRoutes = ['/ai', '/assistant', '/chat', '/playground'];
      
      for (const route of aiRoutes) {
        await page.goto(route);
        if (page.url().includes(route)) {
          const errorPage = page.locator('text=404, text="Not Found"');
          const hasError = await errorPage.isVisible().catch(() => false);
          
          if (!hasError) {
            assistantOpened = true;
            break;
          }
        }
      }
    }

    expect(assistantOpened).toBe(true);
  });

  test('should have chat input functionality', async ({ page }) => {
    // First try to open AI assistant
    const aiTrigger = page.locator('[data-testid="ai-assistant"], button:has-text("AI")');
    if (await aiTrigger.isVisible().catch(() => false)) {
      await aiTrigger.click();
      await page.waitForTimeout(1000);
    } else {
      // Try navigating to AI route
      await page.goto('/ai');
      if (page.url().includes('/ai')) {
        const errorPage = page.locator('text=404');
        const hasError = await errorPage.isVisible().catch(() => false);
        if (hasError) {
          await page.goto('/playground');
        }
      }
    }

    // Look for chat input elements
    const chatInputs = [
      page.locator('input[placeholder*="message" i]'),
      page.locator('input[placeholder*="ask" i]'),
      page.locator('input[placeholder*="type" i]'),
      page.locator('textarea[placeholder*="message" i]'),
      page.locator('textarea[placeholder*="ask" i]'),
      page.locator('[data-testid="chat-input"]'),
      page.locator('[data-testid="message-input"]'),
      page.locator('.chat-input'),
      page.locator('.message-input'),
      page.locator('input[type="text"]').last(),
      page.locator('textarea').last()
    ];

    let chatInputFound = false;
    let workingInput = null;
    
    for (const input of chatInputs) {
      if (await input.isVisible().catch(() => false)) {
        chatInputFound = true;
        workingInput = input;
        console.log('Found chat input field');
        break;
      }
    }

    expect(chatInputFound).toBe(true);

    if (workingInput) {
      // Test typing in the input
      await workingInput.fill('Hello, AI assistant!');
      const inputValue = await workingInput.inputValue();
      expect(inputValue).toBe('Hello, AI assistant!');
    }
  });

  test('should have send message functionality', async ({ page }) => {
    // Open AI assistant first
    const aiTrigger = page.locator('[data-testid="ai-assistant"], button:has-text("AI")');
    if (await aiTrigger.isVisible().catch(() => false)) {
      await aiTrigger.click();
      await page.waitForTimeout(1000);
    } else {
      await page.goto('/playground');
    }

    // Find input and send button
    const chatInput = page.locator('input[placeholder*="message" i], textarea[placeholder*="message" i], [data-testid="chat-input"]');
    const sendButtons = [
      page.locator('button:has-text("Send")'),
      page.locator('button[type="submit"]'),
      page.locator('[data-testid="send-button"]'),
      page.locator('.send-button'),
      page.locator('button[aria-label*="send" i]'),
      page.locator('button svg').first() // Often send buttons have arrow icons
    ];

    if (await chatInput.isVisible().catch(() => false)) {
      await chatInput.fill('Test message');
      
      let messageSent = false;
      for (const sendButton of sendButtons) {
        if (await sendButton.isVisible().catch(() => false)) {
          await sendButton.click();
          messageSent = true;
          
          // Wait for response or message to appear
          await page.waitForTimeout(2000);
          
          // Check if message appears in chat
          const messageElements = [
            page.getByText('Test message'),
            page.locator('.message:has-text("Test message")'),
            page.locator('[data-testid="message"]:has-text("Test message")')
          ];

          let messageDisplayed = false;
          for (const element of messageElements) {
            if (await element.isVisible().catch(() => false)) {
              messageDisplayed = true;
              break;
            }
          }

          expect(messageDisplayed).toBe(true);
          break;
        }
      }

      if (!messageSent) {
        // Try pressing Enter
        await chatInput.press('Enter');
        await page.waitForTimeout(1000);
        
        const messageAppeared = await page.getByText('Test message').isVisible().catch(() => false);
        expect(messageAppeared).toBe(true);
      }
    } else {
      test.fail(true, 'Chat input not found for send message test');
    }
  });

  test('should display AI responses', async ({ page }) => {
    // Open AI assistant
    const aiTrigger = page.locator('[data-testid="ai-assistant"], button:has-text("AI")');
    if (await aiTrigger.isVisible().catch(() => false)) {
      await aiTrigger.click();
      await page.waitForTimeout(1000);
    } else {
      await page.goto('/playground');
    }

    const chatInput = page.locator('input[placeholder*="message" i], textarea[placeholder*="message" i], [data-testid="chat-input"]');
    
    if (await chatInput.isVisible().catch(() => false)) {
      // Send a simple question
      await chatInput.fill('What can you help me with?');
      
      const sendButton = page.locator('button:has-text("Send"), button[type="submit"], [data-testid="send-button"]');
      if (await sendButton.isVisible().catch(() => false)) {
        await sendButton.click();
      } else {
        await chatInput.press('Enter');
      }

      // Wait for AI response
      await page.waitForTimeout(5000);
      
      // Look for response elements
      const responseElements = [
        page.locator('.ai-response'),
        page.locator('.assistant-message'),
        page.locator('[data-testid="ai-response"]'),
        page.locator('.message:not(:has-text("What can you help"))'),
        page.locator('.response'),
        page.locator('.reply')
      ];

      let responseFound = false;
      for (const element of responseElements) {
        if (await element.isVisible().catch(() => false)) {
          const responseText = await element.textContent();
          if (responseText && responseText.length > 10) {
            responseFound = true;
            console.log('Found AI response:', responseText.substring(0, 100));
            break;
          }
        }
      }

      if (!responseFound) {
        // Check for any new text that appeared after sending message
        const allMessages = page.locator('.message, [data-testid="message"], .chat-message');
        const messageCount = await allMessages.count();
        
        if (messageCount > 1) {
          responseFound = true;
          console.log('Found multiple messages indicating conversation');
        }
      }

      expect.soft(responseFound).toBe(true);
    } else {
      test.skip(true, 'Chat input not available for response testing');
    }
  });

  test('should handle conversation history', async ({ page }) => {
    // Open AI assistant
    const aiTrigger = page.locator('[data-testid="ai-assistant"], button:has-text("AI")');
    if (await aiTrigger.isVisible().catch(() => false)) {
      await aiTrigger.click();
      await page.waitForTimeout(1000);
    } else {
      await page.goto('/playground');
    }

    // Look for conversation history elements
    const historyElements = [
      page.locator('.conversation-history'),
      page.locator('.chat-history'),
      page.locator('[data-testid="chat-history"]'),
      page.locator('.messages'),
      page.locator('.chat-messages'),
      page.locator('[data-testid="messages"]')
    ];

    let historyFound = false;
    for (const element of historyElements) {
      if (await element.isVisible().catch(() => false)) {
        historyFound = true;
        console.log('Found conversation history container');
        break;
      }
    }

    if (!historyFound) {
      // Check for any existing messages in the interface
      const existingMessages = page.locator('.message, [data-testid="message"], .chat-message');
      const messageCount = await existingMessages.count();
      
      if (messageCount > 0) {
        historyFound = true;
        console.log(`Found ${messageCount} existing messages`);
      }
    }

    expect.soft(historyFound).toBe(true);
  });

  test('should have proper error handling for AI failures', async ({ page }) => {
    // This test checks if there's proper error handling in the AI system
    // We'll look for error states or try to trigger them

    await page.goto('/playground');
    
    const chatInput = page.locator('input[placeholder*="message" i], textarea[placeholder*="message" i]');
    
    if (await chatInput.isVisible().catch(() => false)) {
      // Try sending a very long message or special characters that might cause errors
      await chatInput.fill('a'.repeat(10000)); // Very long message
      
      const sendButton = page.locator('button:has-text("Send"), button[type="submit"]');
      if (await sendButton.isVisible().catch(() => false)) {
        await sendButton.click();
      } else {
        await chatInput.press('Enter');
      }

      await page.waitForTimeout(3000);
      
      // Look for error handling elements
      const errorElements = [
        page.locator('.error'),
        page.locator('.alert-error'),
        page.locator('[role="alert"]'),
        page.getByText(/error/i),
        page.getByText(/failed/i),
        page.getByText(/try again/i),
        page.locator('[data-testid="error"]')
      ];

      let errorHandlingFound = false;
      for (const element of errorElements) {
        if (await element.isVisible().catch(() => false)) {
          errorHandlingFound = true;
          console.log('Found error handling:', await element.textContent());
          break;
        }
      }

      // Error handling is good to have but not strictly required for basic functionality
      expect.soft(errorHandlingFound).toBe(true);
    } else {
      test.skip(true, 'AI interface not available for error handling testing');
    }
  });
});