from behave import given, when, then
from pages.google_page import GooglePage

@given("I open Google homepage")
def step_open_google(context):
    context.page = GooglePage(context.driver)
    context.page.open()

@then('I search for "{text}"')
def step_search(context, text):
    context.page.search(text)
