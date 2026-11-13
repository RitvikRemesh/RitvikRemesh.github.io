import unittest

from app import app


class PortfolioAppTests(unittest.TestCase):
    def setUp(self):
        app.config.update(TESTING=True)
        self.client = app.test_client()

    def test_homepage_renders_portfolio_sections(self):
        response = self.client.get("/")

        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Ritvik Remesh", response.data)
        self.assertIn(b'id="projects"', response.data)
        self.assertIn(b'id="contact"', response.data)

    def test_static_assets_are_served_from_expected_routes(self):
        for path in (
            "/static/style.css",
            "/static/site.js",
            "/assets/profile_img/ritvik.jpg",
            "/assets/projects/project1.jpg",
        ):
            with self.subTest(path=path):
                response = self.client.get(path)
                self.assertEqual(response.status_code, 200)
                response.close()
