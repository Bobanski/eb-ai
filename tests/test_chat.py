import csv, pytest
from src.services.recommender import recommend

@pytest.mark.parametrize("user_input,expected_id",
    [(r["user_input"], r["expected_id"])
     for r in csv.DictReader(open("data/test_set.csv"))])
def test_recommender(user_input, expected_id):
    assert recommend(user_input).id == expected_id
